# Projects Structure

## Estado actual

El portfolio usa una sola fuente de verdad para el catálogo de proyectos:

```text
data/projects.js
```

Desde ahí se generan dinámicamente:

- `Featured Projects`
- `Project Archive`

## Inventario

| Proyecto | Featured | Archive | Categorías |
| --- | --- | --- | --- |
| TFG VR Interaction Design Guide | sí | sí | `filter-vr` |
| Godly Thief | sí | sí | `filter-action` |
| Twisted Tail | sí | sí | `filter-puzzle` |
| Ghosts'N Goblins | no | sí | `filter-action` |
| Towers of Clickanium | no | sí | `filter-action` |
| Restaurant Extravaganzza | no | sí | `filter-simulation` |
| Playern't Fantasy | no | sí | `filter-turnBased` |

## Campos por proyecto

Cada entrada puede contener:

- `id`
- `featured`
- `featuredOrder`
- `archive`
- `categories`
- `title`
- `images.thumbnail`
- `images.hero` cuando aplica
- `featuredMeta`
- `featuredDescription`
- `featuredContributions`
- `note` opcional
- `archiveSummary`
- `archiveContributions`
- `link.href`
- `link.labelKey`

## Diferenciación Featured vs Archive

La estructura mantiene textos separados por contexto:

- `featuredDescription`
  - copy más narrativo y de case study
- `archiveSummary`
  - pitch corto del juego
- `featuredContributions`
  - detalle amplio
- `archiveContributions`
  - versión compacta para card

## Reglas de UX preservadas

- siguen existiendo exactamente 3 proyectos featured,
- el archive sigue siendo la capa secundaria de exploración,
- el filtro sigue operando por clases `filter-*`,
- y `GhostNGoblins` sigue apuntando a la build local jugable.

## Cambio importante del archive

Las cards ya no mezclan resumen y contribuciones en un solo párrafo.

Ahora soportan:

1. resumen corto opcional
2. lista separada de contribuciones
3. CTA final

Esto se aplicó también al proyecto `Ghosts'N Goblins`, que ahora expone sus contribuciones con bullets explícitos.

## Dependencias visuales

Assets usados por el sistema:

- thumbnails en `assets/img/portfolio/`
- hero images para los 3 featured en `assets/img/portfolio/`
- PDF del TFG en `assets/docs/`
- build local jugable en `GhostNGoblins/GhostNGoblins.html`

## Tradeoff actual

El catálogo quedó centralizado y mantenible, pero los labels de filtros siguen fuera de `projects.js` y no están localizados.
