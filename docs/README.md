# Portfolio Technical Docs

## Resumen

El portfolio sigue siendo una web estática sin build pipeline orientada a presentar el perfil de Adrián Guerra como `Technical Game Designer` especializado en `gameplay systems` y `VR/XR`.

La experiencia principal mantiene este orden:

1. hero y posicionamiento profesional
2. `Featured Projects`
3. timeline / resume
4. `Project Archive`
5. contacto

## Stack real

| Capa | Implementación |
| --- | --- |
| Estructura base | `index.html` |
| Estilos | `assets/css/styles.css` |
| Lógica UI | `js/main.js` |
| UI traducible compartida | `data/strings.json` |
| Datos de proyectos | `data/projects.js` |
| Datos de timeline | `data/timeline.js` |
| Utilidades visuales | Bootstrap 5 y Font Awesome vía CDN |
| Fondo decorativo | `particles.js` vía CDN |
| Proyecto jugable enlazado | `GhostNGoblins/` |

No hay framework, bundler ni compilación.

## Estructura principal

```text
.
├── index.html
├── js/
│   └── main.js
├── data/
│   ├── projects.js
│   ├── timeline.js
│   └── strings.json
├── assets/
│   ├── css/styles.css
│   ├── docs/
│   ├── fonts/
│   └── img/
├── docs/
└── GhostNGoblins/
```

## Modelo de contenido

La web usa tres fuentes con responsabilidades separadas:

- `data/strings.json`
  - copy compartido de UI
  - labels de CTA genéricos
  - texto de transición del archive
  - labels del popover de timeline
- `data/projects.js`
  - títulos de proyecto
  - textos featured
  - textos archive
  - contribuciones
  - assets
  - categorías
  - enlaces
- `data/timeline.js`
  - títulos y roles
  - fechas
  - institución o empresa
  - línea visible de contexto
  - bullets de detalle
  - tech tags
  - logos

## Ejecución local

El sitio necesita servidor local porque `strings.json` se carga con `fetch()`.

```bash
cd "/home/ookami/Páginas web/jagv94 (portfolio)/jagv94.github.io"
python3 -m http.server 8000
```

Abrir:

```text
http://localhost:8000
```

## Cambios estructurales relevantes

- `Featured Projects` y `Project Archive` se renderizan desde `data/projects.js`.
- La `Timeline` se renderiza ahora desde `data/timeline.js`.
- El fallback inglés sigue visible incluso antes de que termine la carga de traducciones.
- El popover de timeline ya no depende del contenido de `strings.json`.
- El enlace visible de Twitter/X se retiró del sidebar y del `sameAs` del schema.

## Flujo recomendado para añadir contenido

### Proyecto nuevo

Editar `data/projects.js` y añadir:

- copy localizado,
- imágenes,
- categorías,
- link,
- flags `featured` y/o `archive`.

### Entrada nueva de timeline

Editar `data/timeline.js` y añadir un objeto con:

- `id`
- `type`
- `logo`
- `title`
- `role`
- `date`
- `place`
- `entity`
- `bullets`
- `tech`

No hace falta tocar `index.html` ni crear claves nuevas en `strings.json` salvo que aparezca UI nueva.

## Observaciones importantes

- Los filtros del archive siguen hardcodeados en inglés.
- Las skill pills siguen hardcodeadas y no forman parte del sistema i18n.
- `GhostNGoblins/` sigue siendo una subpágina independiente enlazada desde el archive.
