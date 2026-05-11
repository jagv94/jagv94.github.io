# Timeline Structure

## Objetivo

La Timeline se trata como `content data`, no como un bloque de UI hardcodeado ni como un conjunto de strings sueltas.

El objetivo del refactor fue:

- eliminar HTML repetido,
- concentrar el contenido en una sola fuente,
- simplificar localización,
- y mantener el mismo layout visual y el mismo popover.

## Fuente de verdad

La Timeline vive en:

```text
data/timeline.js
```

Exporta:

```js
window.PORTFOLIO_TIMELINE
```

con una lista ordenada de entradas localizadas.

## Forma de cada entrada

```js
{
  id: "ub",
  type: "work",
  logo: {
    src: "assets/img/logos/ub-logo.png",
    alt: t("...", "...", "...")
  },
  title: t("...", "...", "..."),
  role: t("...", "...", "..."),
  date: t("...", "...", "..."),
  place: t("...", "...", "..."),
  entity: t("...", "...", "..."),
  bullets: t(["..."], ["..."], ["..."]),
  tech: t(["..."], ["..."], ["..."])
}
```

## Responsabilidad de cada campo

| Campo | Uso |
| --- | --- |
| `id` | clave estable para el popover y `aria-expanded` |
| `type` | metadata de trabajo o formación |
| `logo` | asset visual y alt localizado |
| `title` | copy visible en la card |
| `role` | copy visible en el popover |
| `date` | rango temporal visible |
| `place` | línea corta visible bajo la fecha |
| `entity` | nombre completo en cabecera del popover |
| `bullets` | detalle principal del popover |
| `tech` | tags técnicos del popover |

## Render

`index.html` solo mantiene:

- `#timelineList` como contenedor,
- y `#timelinePopover` como shell del diálogo.

`js/main.js` hace:

1. `renderTimelineItems()`
2. `renderTimelineSection()`
3. `initTimelineInteractions()`
4. `showTimelinePopover()`

## Añadir una nueva entrada

1. Insertar el objeto nuevo en `data/timeline.js` en el orden visual deseado.
2. Reutilizar `t(...)` para `en`, `es` y `ja`.
3. Añadir logo nuevo si hace falta en `assets/img/logos/`.
4. Verificar que `id` sea único.
5. Probar:
   - render en los tres idiomas,
   - apertura del popover,
   - cierre por `X`, `Escape` y outside-click,
   - navegación por teclado.

## Tradeoffs

- El HTML inicial de la Timeline ya no contiene fallback estático por entrada.
- A cambio, se elimina la duplicación entre HTML y traducciones y se abarata mucho el mantenimiento.
- El contenido queda más fácil de ampliar sin tocar estructura ni listeners.
