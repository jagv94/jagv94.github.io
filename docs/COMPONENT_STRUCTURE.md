# Component Structure

## Modelo real

No existe sistema de componentes de framework. La modularidad actual se reparte entre:

- shell HTML estable,
- componentes visuales definidos por clases CSS,
- render dinámico de proyectos en `js/main.js`,
- y datos externos en `data/strings.json` y `data/projects.js`.

## Componentes principales

| Componente | Root DOM | Datos | JS asociado |
| --- | --- | --- | --- |
| Loader | `#loader` | HTML fijo | ocultado en `load` |
| Sidebar | `aside#sidebar` | HTML + `strings.json` | toggle móvil, smooth scroll, idioma |
| Hero | `header#home` | HTML + `strings.json` | i18n, toggle de skills, scroll indicator |
| Featured gallery | `#featuredGallery` | `projects.js` | render + `initFeaturedGallery()` |
| Timeline strip | `.timeline-horizontal` | HTML + `strings.json` | popover y rehidratación por idioma |
| Timeline popover | `#timelinePopover` | `strings.json` | `showTimelinePopover()` |
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

Mantiene solo UI compartida y timeline:

- navegación
- hero
- CTA genéricos
- texto de transición antes del archive
- timeline visible
- contenido del popover

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

## Dependencias internas delicadas

- `initFeaturedGallery()` depende de la estructura `.featured-panel > .panel-base > .panel-expanded-content`.
- `applyPortfolioFilter()` depende de las clases `filter-*`.
- el timeline sigue siendo híbrido:
  - shell visible en HTML,
  - detalle en `strings.json`.

## Cambios recientes reflejados aquí

- eliminación de duplicidad de proyectos entre HTML y JSON,
- soporte de archive con bullets separados,
- y preservación del patrón desktop mientras se endurece el flujo móvil.
