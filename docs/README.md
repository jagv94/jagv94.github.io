# Portfolio Technical Docs

## Resumen

El portfolio sigue siendo una web estática sin build pipeline orientada a presentar el perfil de Adrián Guerra como `Technical Game Designer` especializado en `gameplay systems` y `VR/XR`.

La experiencia principal sigue este orden:

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

Hay dos fuentes de datos separadas a propósito:

- `data/strings.json`
  - copy compartido de UI
  - CTA genéricos
  - timeline visible
  - popover de experiencia
- `data/projects.js`
  - títulos de proyecto
  - textos featured
  - textos archive
  - contribuciones
  - assets
  - categorías
  - enlaces

Esta separación evita duplicar el catálogo de proyectos entre HTML y traducciones.

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

- `Featured Projects` y `Project Archive` ya no están hardcodeados en `index.html`.
- Ambos se renderizan dinámicamente desde `data/projects.js`.
- El fallback inglés sigue visible incluso antes de que termine la carga de traducciones.
- El enlace visible de Twitter/X se retiró del sidebar y del `sameAs` del schema.
- El wording visible se ajustó para reforzar `Technical Game Design`.

## Observaciones importantes

- Los filtros del archive siguen hardcodeados en inglés.
- Las skill pills siguen hardcodeadas y no forman parte del sistema i18n.
- `GhostNGoblins/` sigue siendo una subpágina independiente enlazada desde el archive.
