# JavaScript Functions

## Archivo principal

Toda la lógica del portfolio principal vive en:

```text
js/main.js
```

## Objetos base

| Variable | Propósito |
| --- | --- |
| `defaultLang` | fallback global de idioma (`en`) |
| `supportedLangs` | whitelist de locales soportados |
| `projectData` | catálogo centralizado leído desde `window.PORTFOLIO_PROJECTS` |
| `timelineEntries` | timeline centralizada leída desde `window.PORTFOLIO_TIMELINE` |
| `projectUiFallbacks` | labels mínimos para render antes de cargar `strings.json` |
| `featuredViewportState` | guarda modo (`mobile`/`desktop`) y ancho usado para evitar reinits espurios |
| `lastTimelineTriggerEntity` | recuerda qué item de timeline abrió el popover para restaurar foco |

## Funciones clave

| Función | Propósito |
| --- | --- |
| `getLocalizedValue()` | resuelve string o array localizado con fallback a `en` |
| `getUiLabel()` | resuelve labels desde `strings.json` o fallback embebido |
| `getTimelineEntryById()` | recupera una entrada de timeline por `id` |
| `renderFeaturedProjects()` | genera el HTML de los 3 featured desde `projects.js` |
| `renderArchiveProjects()` | genera el archive completo desde `projects.js` |
| `renderProjectSections()` | re-renderiza featured + archive y restaura estado activo |
| `renderTimelineItems()` | genera el HTML de la Timeline desde `timeline.js` |
| `renderTimelineSection()` | re-renderiza la Timeline completa y resincro de `aria-expanded` |
| `syncTimelineExpandedState()` | marca qué botón de timeline está asociado al popover abierto |
| `applyTranslations()` | aplica `data-i18n`, re-renderiza proyectos y timeline y refresca UI dependiente del idioma |
| `updateTimelineUiLabels()` | localiza `aria-label` del diálogo y del botón de cierre |
| `updateResumeLink()` | cambia el CV según idioma |
| `setupLanguageButtons()` | inicializa selector de idioma |
| `applyPortfolioFilter()` | muestra/oculta cards del archive |
| `initPortfolioFilters()` | conecta los botones de filtro |
| `initFeaturedGallery()` | controla expansión/cierre de featured en móvil y desktop |
| `initTimelineInteractions()` | conecta una sola escucha delegada para toda la Timeline |
| `showTimelinePopover()` | monta el popover del timeline con datos de `timeline.js` |
| `closeTimelinePopover()` | cierra el popover, limpia estado y opcionalmente restaura foco |
| `updateOpenPopover()` | rehidrata un popover abierto tras cambiar idioma |
| `updateFaviconForTheme()` | sincroniza favicon con light/dark mode |

## Flujo de arranque

1. resuelve `lang` desde query param, `localStorage` o `en`
2. renderiza proyectos inmediatamente con fallback
3. renderiza timeline inmediatamente desde `timeline.js`
4. aplica labels mínimos del popover
5. conecta selector de idioma
6. conecta delegación de timeline
7. intenta aplicar traducciones cacheadas
8. hace `fetch("data/strings.json")`
9. inicializa:
   - sidebar,
   - loader,
   - filtros,
   - featured gallery,
   - timeline popover,
   - scroll indicator

## Timeline data-driven

### Render

- `index.html` solo conserva `#timelineList` y el shell del popover.
- `renderTimelineSection()` sustituye el contenido visible desde `timelineEntries`.
- los items se renderizan como `<button>` para soportar click, touch y teclado sin listeners por nodo.

### Interacción

- `initTimelineInteractions()` usa delegación en `#timelineList`.
- `showTimelinePopover()` rellena logo, entidad, rol, bullets y tech tags desde `data/timeline.js`.
- `closeTimelinePopover()` restablece `aria-expanded` y devuelve foco al trigger cuando procede.
- un cambio de idioma con el popover abierto ya no lo invalida: `updateOpenPopover()` vuelve a montarlo con el locale actual.

## Featured gallery

### Móvil

- click sobre miniatura abre panel inline,
- click dentro del contenido expandido no vuelve a disparar expansión,
- el contenido expandido recupera `pointer-events` reales,
- CTA y botón `X` funcionan como elementos interactivos normales,
- click fuera de `.featured-gallery` cierra el panel móvil abierto,
- un `resize` sin cambio real de ancho ya no reinicializa la galería.

### Desktop

- click sobre panel activa `is-active`,
- click fuera de `.featured-gallery` limpia estado,
- CTA internos siguen funcionando y no disparan cierre accidental.

## Filtros del archive

- el grid se vuelve a renderizar cuando cambia idioma,
- por eso `applyPortfolioFilter()` consulta el DOM actual y no depende de una lista estática vieja,
- el filtro activo se reaplica tras cada render.

## Limitaciones conocidas

- los labels de filtros no están localizados,
- las skill pills siguen fuera del sistema de traducción,
- y el `scrollIndicator` sigue siendo clicable pero no es un botón semántico.
