# Portafolio Backend Developer — Eduard Alejandro Vega Díaz

Portafolio personal con estética de editor de código / terminal, diseñado para mostrar mi perfil como desarrollador backend. Construido con HTML, CSS y JavaScript puro, sin frameworks ni dependencias externas.

## Características

- **Diseño tipo terminal**: secciones estructuradas como bloques de código (`const sobre_mi =`, `class BackendDeveloper`), lluvia de código y fondo binario animado.
- **Paleta moderna sobre fondo oscuro**: esmeralda, índigo y violeta pastel con brillos sutiles. Incluye **modo claro** con botón en la barra de navegación (se guarda en `localStorage`).
- **Idioma ES/EN**: toggle que traduce navegación, títulos, secciones, formulario y proyecto (persistente).
- **Animaciones**: efecto de escritura en el hero, glitch en el nombre, contadores animados y barras de habilidades.
- **Loader de arranque** estilo terminal al abrir la página.
- **Estadísticas y widget de GitHub en vivo**: contadores de proyectos, commits y stars + repos, seguidores y gists actualizados automáticamente vía GitHub API (con respaldo estático si la API no responde).
- **Modal de detalle de proyectos**: al hacer clic en una tarjeta muestra descripción, arquitectura (monorepo) y stack completo.
- **Filtros de proyectos** por categoría (Full-stack / Frontend / Backend).
- **Badge de estado** ("Disponible para proyectos") y **botón de descarga de CV**.
- **Sección Experiencia**: timeline + soft skills.
- **Accesibilidad**: menú hamburguesa con `aria-expanded`, `aria-current` en la navegación activa y teclado para abrir modales.

## Secciones

- Inicio (hero con stack tecnológico, estado y CV)
- Sobre mí (panel de código + estadísticas + widget GitHub)
- Habilidades (barras de progreso por categoría)
- Experiencia (timeline + soft skills)
- Proyectos (tarjetas con snippets reales, filtros y modal de detalle)
- Contacto (datos de contacto + formulario conectado a backend)

## Formulario de contacto (backend)

El formulario envía el mensaje a una API real de Node.js/Express que lo reenvía por email con Nodemailer.

```bash
cd server
npm install
cp .env.example .env   # configura tu email SMTP (Gmail con contraseña de aplicación)
npm start              # sirve el portafolio + la API en http://localhost:3000
```

- `POST /api/contact` — recibe `{ name, email, message }`, valida, limita por IP y envía el email a `alejandrovega.1593@gmail.com`.
- `GET /api/health` — healthcheck.
- Sin SMTP configurado, la API responde `503` y el formulario muestra el error en pantalla.

## Tecnologías

| Área | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 (Grid, Flexbox, animaciones, variables CSS, tema claro) |
| Lógica | JavaScript vanilla (ES6+) |
| Tipografías | Fira Code, Orbitron (Google Fonts) |
| Backend de contacto | Node.js, Express, Nodemailer, Helmet, CORS, rate-limit |

## Estructura del proyecto

```
portafolio/
├── index.html           # Página principal
├── styles_backend.css   # Estilos y tema visual
├── script_backend.js    # Animaciones e interacciones
├── assets/
│   └── Resumen_Curricular_Eduard_Vega_Backend.pdf  # Currículum descargable
└── server/              # API de contacto (Node.js + Express)
    ├── server.js
    ├── package.json
    └── .env.example
```

## Cómo verlo

No requiere instalación ni build para la parte estática.

**Opción 1 — Abrir directamente:**

`index.html`.

**Opción 2 — Con envío de mensajes funcional:**

Levanta el servidor (ver sección de formulario) y abre `http://localhost:3000`.

© 2026 Eduard Alejandro Vega Díaz