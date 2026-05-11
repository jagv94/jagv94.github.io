# Component Structure

## Modelo real

No existe sistema de componentes de framework. La modularidad actual se reparte entre:

- shell HTML estable,
- componentes visuales definidos por clases CSS,
- render dinámico en `js/main.js`,
- y datos externos en `data/strings.json`, `data/projects.js` y `data/timeline.js`.

## Componentes principales

| Componente | Root DOM | Datos | JS asociado |
| --- | --- | --- | --- |
| Loader | `#loader` | HTML fijo | ocultado en `load` |
| Sidebar | `aside#sidebar` | HTML + `strings.json` | toggle móvil, smooth scroll, idioma |
| Hero | `header#home` | HTML + `strings.json` | i18n, toggle de skills, scroll indicator |
| Featured gallery | `#featuredGallery` | `projects.js` | render + `initFeaturedGallery()` |
| Timeline strip | `#timelineList` | `timeline.js` | render + delegación de eventos |
| Timeline popover | `#timelinePopover` | `timeline.js` + `strings.json` | `showTimelinePopover()` + `updateTimelineUiLabels()` |
| Archive grid | `#portfolioGrid` | `projects.js` | render + filtros |
| Contact CTA | `#contact` | HTML + `strings.json` | sin lógica específica |

## Featured gallery

### Estructura renderizada

```html
<div class="featured-panel" data-project="tfg">
  <div class="panel-base">
    <div class="panel-image-wrapper">...</div>
    <div class="panel-expanded-content">
      <button class="mobile-close-btn">...</button>
      <div class="expanded-inner">
        <img class="expanded-hero">
        <div class="project-details">...</div>
      </div>
    </div>
  </div>
</div>
```

### Dependencias

- `data-project` se usa para restaurar estado y para reglas CSS específicas.
- `mobile-close-btn` se mantiene como control explícito en touch.
- el render siempre genera exactamente 3 featured.

## Timeline

### Estructura renderizada

```html
<div class="timeline-horizontal" id="timelineList">
  <button class="timeline-item" data-entity="ub" data-type="work" type="button" aria-haspopup="dialog" aria-controls="timelinePopover" aria-expanded="false">
    <div class="timeline-logo-wrapper">...</div>
    <div class="timeline-content">...</div>
  </button>
</div>
```

### Consecuencias

- la Timeline ya no duplica nodos en `index.html`,
- cada entrada se define una sola vez en `data/timeline.js`,
- los items son botones reales y mejoran navegación por teclado,
- el contenedor mantiene una sola escucha delegada incluso si hay re-render por idioma.

## Archive card

### Estructura renderizada

```html
<div class="portfolio-item filter-action" data-project="ghostngoblins">
  <div class="portfolio-card">
    <img class="portfolio-img">
    <div class="portfolio-overlay">
      <h5 class="portfolio-title">...</h5>
      <p class="portfolio-summary">...</p>
      <ul class="portfolio-contributions">...</ul>
      <a class="portfolio-link">...</a>
    </div>
  </div>
</div>
```

### Consecuencias

- summary y contribuciones quedan separados visualmente,
- el filtro sigue dependiendo de clases `filter-*`,
- y las cards siguen siendo más compactas que los featured panels.

## Fuentes de datos

### `data/strings.json`

Mantiene solo UI compartida:

- navegación
- hero
- CTA genéricos
- texto de transición antes del archive
- labels del popover de timeline

### `data/projects.js`

Mantiene el catálogo localizado:

- títulos
- copy featured
- copy archive
- listas de contribuciones
- meta de featured
- imágenes
- categorías
- enlaces

### `data/timeline.js`

Mantiene la trayectoria localizada:

- títulos visibles
- roles del popover
- fechas
- institución / empresa
- línea visible de contexto
- bullets de detalle
- tech tags
- logos

## Dependencias internas delicadas

- `initFeaturedGallery()` depende de la estructura `.featured-panel > .panel-base > .panel-expanded-content`.
- `applyPortfolioFilter()` depende de las clases `filter-*`.
- `renderTimelineSection()` depende de que `#timelineList` permanezca como contenedor estable.
- `updateOpenPopover()` depende de `popover.dataset.currentEntity` para rehidratar el detalle al cambiar idioma.

## Flujo recomendado para añadir una entrada de timeline

1. Añadir un objeto nuevo a `data/timeline.js`.
2. Reutilizar el helper `t(...)` para los tres idiomas.
3. Mantener `title` para la card y `role` para el popover si el copy corto y largo difieren.
4. Verificar logo, `id` único y orden dentro del array.
5. Confirmar que el render aparece sin tocar `index.html`.
