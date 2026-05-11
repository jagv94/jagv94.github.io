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
| `projectUiFallbacks` | labels mínimos para render de proyectos antes de cargar `strings.json` |
| `featuredViewportState` | guarda modo (`mobile`/`desktop`) y ancho usado para evitar reinits espurios |

## Funciones clave

| Función | Propósito |
| --- | --- |
| `getLocalizedValue()` | resuelve string o array localizado con fallback a `en` |
| `getUiLabel()` | resuelve labels de CTA/contribuciones desde `strings.json` o fallback embebido |
| `renderFeaturedProjects()` | genera el HTML de los 3 featured desde `projects.js` |
| `renderArchiveProjects()` | genera el archive completo desde `projects.js` |
| `renderProjectSections()` | re-renderiza featured + archive y restaura estado activo |
| `applyTranslations()` | aplica `data-i18n`, re-renderiza proyectos y refresca UI dependiente del idioma |
| `updateResumeLink()` | cambia el CV según idioma |
| `setupLanguageButtons()` | inicializa selector de idioma |
| `applyPortfolioFilter()` | muestra/oculta cards del archive |
| `initPortfolioFilters()` | conecta los botones de filtro |
| `initFeaturedGallery()` | controla expansión/cierre de featured en móvil y desktop |
| `showTimelinePopover()` | monta el popover del timeline con datos del locale actual |
| `updateOpenPopover()` | rehidrata un popover abierto tras cambiar idioma |
| `updateFaviconForTheme()` | sincroniza favicon con light/dark mode |

## Flujo de arranque

1. resuelve `lang` desde query param, `localStorage` o `en`
2. renderiza proyectos inmediatamente con fallback
3. conecta selector de idioma
4. intenta aplicar traducciones cacheadas
5. hace `fetch("data/strings.json")`
6. inicializa:
   - sidebar,
   - loader,
   - filtros,
   - featured gallery,
   - timeline popover,
   - scroll indicator

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

## Corrección del bug móvil

La regresión venía de reinicializar la galería en cualquier `resize`. En navegadores móviles eso puede ocurrir al variar la altura visible del viewport durante scroll.

La versión actual:

- compara ancho previo y actual,
- ignora `resize` de solo altura,
- y conserva el proyecto abierto si de verdad hay un cambio de layout.

## Filtros del archive

- el grid se vuelve a renderizar cuando cambia idioma,
- por eso `applyPortfolioFilter()` consulta el DOM actual y no depende de una lista estática vieja,
- el filtro activo se reaplica tras cada render.

## Limitaciones conocidas

- el timeline sigue dependiendo de `sessionStorage.strings` para el popover,
- los labels de filtros no están localizados,
- y las skill pills siguen fuera del sistema de traducción.
