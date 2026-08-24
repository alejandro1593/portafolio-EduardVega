# Portafolio Backend Developer — Eduard Alejandro Vega Díaz

Portafolio personal con estética de editor de código / terminal, diseñado para mostrar mi perfil como desarrollador backend. Construido con HTML, CSS y JavaScript puro, sin frameworks ni dependencias externas.

## Características

- **Diseño tipo terminal**: secciones estructuradas como bloques de código (`const sobre_mi =`, `class BackendDeveloper`), lluvia de código y fondo binario animado.
- **Paleta moderna sobre fondo oscuro**: esmeralda, índigo y violeta pastel con brillos sutiles.
- **Animaciones**: efecto de escritura en el hero, glitch en el nombre, contadores animados y barras de habilidades.
- **Secciones**:
  - Inicio (hero con stack tecnológico)
  - Sobre mí (panel de código + estadísticas)
  - Habilidades (barras de progreso por categoría)
  - Proyectos (tarjetas con snippets de código reales)
  - Contacto (datos de contacto + formulario)
- **Responsive**: adaptado a tablet y móvil con menú hamburguesa.
- **Extras**: copiar código al portapapeles con un clic, notificaciones y navegación activa según la sección visible.

## Tecnologías

| Área | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 (Grid, Flexbox, animaciones, variables CSS) |
| Lógica | JavaScript vanilla (ES6+) |
| Tipografías | Fira Code, Orbitron (Google Fonts) |

## Estructura del proyecto

```
portafolio/
├── index.html           # Página principal
├── styles_backend.css   # Estilos y tema visual
└── script_backend.js    # Animaciones e interacciones
```

## Cómo verlo

No requiere instalación ni build. Dos opciones:

**Opción 1 — Abrir directamente:**

Doble clic en `index.html`.

**Opción 2 — Servidor local (recomendado):**

```bash
# Con Python
python -m http.server 8080

# Con Node.js
npx serve .
```

Luego abre `http://localhost:8080` en tu navegador.

## Personalización

- **Colores**: edita las variables en `:root` al inicio de `styles_backend.css`.
- **Proyectos**: busca la sección `<div class="projects-grid">` en `index.html`.
- **Datos de contacto**: sección `contacto` en `index.html`.

## Contacto

- Email: [Alejandrovega.1593@gmail.com](mailto:Alejandrovega.1593@gmail.com)
- GitHub: [github.com/Alejandro1593](https://github.com/Alejandro1593)

---

© 2026 Eduard Alejandro Vega Díaz
