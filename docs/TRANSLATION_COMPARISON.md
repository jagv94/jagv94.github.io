# Translation Comparison

## Estado actual

| Comprobación | Resultado |
| --- | --- |
| locales presentes | `en`, `es`, `ja` |
| claves raíz por locale en `strings.json` | `49` |
| hojas totales por locale | `109` |
| claves faltantes entre idiomas | `0` |
| claves `data-i18n` del HTML sin traducción | `0` |

## Qué cambió respecto al modelo anterior

- `strings.json` ya no contiene el copy completo de proyectos.
- El catálogo traducido vive en `data/projects.js`.
- El archivo de traducciones quedó reducido a UI compartida + timeline.

## Claves no visibles o especiales

- `less_skills`
  - no aparece en el HTML inicial
  - sí se usa cuando el toggle de skills cambia de estado

No quedan claves huérfanas equivalentes a las que existían antes del mantenimiento.

## Textos que siguen fuera del sistema i18n

- labels de filtros del archive
- skill pills
- códigos y tooltips del selector de idioma

## Conclusión

El sistema está más pequeño y más coherente:

- sin duplicidad de proyecto entre HTML y JSON,
- sin drift entre fallback inglés y copy final,
- y con cobertura completa sobre todo el texto realmente controlado por `data-i18n`.
