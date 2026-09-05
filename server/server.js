import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'alejandrovega.1593@gmail.com';

const app = express();

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Demasiados intentos. Intenta de nuevo más tarde.' },
    standardHeaders: true,
    legacyHeaders: false
});

const transporter = process.env.SMTP_HOST
    ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
          }
      })
    : null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    if (typeof name !== 'string' || typeof message !== 'string') {
        return res.status(400).json({ error: 'Datos inválidos.' });
    }

    if (name.length > 200 || message.length > 5000) {
        return res.status(400).json({ error: 'Mensaje demasiado largo.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email no válido.' });
    }

    if (!transporter) {
        console.error('SMTP no configurado. Revisa el archivo server/.env');
        return res.status(503).json({
            error: 'El servidor de correo no está configurado todavía.'
        });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: CONTACT_EMAIL,
            replyTo: email,
            subject: `[Portafolio] Mensaje de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
                <div style="font-family: monospace; background: #0a0e27; color: #e0e0e0; padding: 24px; border-radius: 8px;">
                    <h2 style="color: #34d399; margin: 0 0 16px;">Nuevo mensaje desde el portafolio</h2>
                    <p><strong style="color: #60a5fa;">Nombre:</strong> ${name.replace(/</g, '&lt;')}</p>
                    <p><strong style="color: #60a5fa;">Email:</strong> ${email.replace(/</g, '&lt;')}</p>
                    <hr style="border-color: rgba(52,211,153,.3)">
                    <p style="white-space: pre-wrap;">${message.replace(/</g, '&lt;')}</p>
                </div>
            `
        });

        return res.status(200).json({ ok: true, message: 'Mensaje enviado con éxito.' });
    } catch (err) {
        console.error('Error enviando email:', err);
        return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo.' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ ok: true, email: CONTACT_EMAIL });
});

app.use(express.static(path.resolve(__dirname, '..')));

app.listen(PORT, () => {
    console.log(`Portafolio servido en http://localhost:${PORT}`);
    console.log(`API de contacto: POST /api/contact`);
});