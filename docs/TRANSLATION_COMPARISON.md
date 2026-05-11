# Translation Comparison

## Estado actual

| Comprobación | Resultado |
| --- | --- |
| locales presentes | `en`, `es`, `ja` |
| claves raíz por locale en `strings.json` | `29` |
| hojas totales por locale | `29` |
| claves faltantes entre idiomas | `0` |
| claves `data-i18n` del HTML sin traducción | `0` |

## Qué cambió respecto al modelo anterior

- `strings.json` ya no contiene el copy completo de proyectos.
- `strings.json` ya no contiene contenido de Timeline.
- El catálogo traducido vive en `data/projects.js`.
- La trayectoria traducida vive en `data/timeline.js`.

## Claves no visibles o especiales

- `less_skills`
  - no aparece en el HTML inicial
  - sí se usa cuando el toggle de skills cambia de estado
- `timeline_dialog_label`
  - no es texto visible
  - sí se usa como `aria-label` del popover
- `timeline_close_label`
  - no es texto visible
  - sí se usa como `aria-label` del botón de cierre

## Textos que siguen fuera del sistema i18n

- labels de filtros del archive
- skill pills
- códigos y tooltips del selector de idioma

## Conclusión

El sistema es más pequeño y más coherente:

- sin duplicidad de proyectos entre HTML y JSON,
- sin duplicidad de timeline entre HTML y JSON,
- y con cobertura completa sobre todo el texto realmente controlado por `data-i18n`.
