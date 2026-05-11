# Maintenance Report Timeline Refactor 2026-05-12

## Resumen

Esta iteración se centró en convertir la sección `Timeline` en una arquitectura data-driven alineada con el sistema ya existente de `Featured Projects` y `Project Archive`.

## Problemas originales

### 1. HTML repetido

Problema:

- la Timeline estaba completamente hardcodeada en `index.html`
- cada entrada repetía estructura, clases y wiring

Impacto:

- añadir o editar una entrada implicaba tocar HTML y traducciones
- mayor riesgo de drift entre contenido visible y contenido del popover

### 2. Contenido mezclado con UI strings

Problema:

- `strings.json` contenía tanto labels de interfaz como payload completo de Timeline

Impacto:

- el archivo de traducciones crecía con contenido que no era UI
- costaba entender qué parte era copy compartido y qué parte era contenido estructural

### 3. Interacción acoplada a nodos estáticos

Problema:

- `main.js` enlazaba listeners a `.timeline-item` ya presentes en el HTML

Impacto:

- poca flexibilidad para re-render por idioma
- riesgo de listeners duplicados si la sección se volvía dinámica

### 4. Accesibilidad limitada

Problema:

- los items eran `div` clicables

Impacto:

- navegación por teclado débil
- semántica pobre para una lista de entradas interactivas

## Soluciones aplicadas

### Nueva fuente de verdad

Se creó:

```text
data/timeline.js
```

Contiene por entrada:

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

### Render dinámico

- `index.html` ahora conserva solo el contenedor `#timelineList`
- `js/main.js` renderiza la Timeline completa desde `window.PORTFOLIO_TIMELINE`
- el popover sigue usando un shell HTML estable y solo rellena contenido dinámico

### Limpieza de traducciones

- se eliminaron de `data/strings.json` todas las claves de Timeline que eran contenido
- `strings.json` quedó limitado a UI compartida y labels accesibles

### Interacción y accesibilidad

- los items de Timeline pasan a renderizarse como `<button>`
- la sección usa delegación de eventos sobre `#timelineList`
- el popover sincroniza `aria-expanded`
- el cierre con botón y `Escape` devuelve el foco al trigger

### Cambio de idioma con popover abierto

- el click en el selector de idioma ya no se interpreta como outside-click del popover
- `updateOpenPopover()` rehidrata el contenido del popover con el idioma nuevo

## Decisiones arquitectónicas

### Separar Timeline de `strings.json`

Motivo:

- Timeline es contenido estructurado, no UI compartida
- encaja mejor como fuente de datos paralela a `projects.js`

Tradeoff:

- aparece un archivo de datos nuevo
- pero a cambio la responsabilidad de cada fuente queda mucho más clara

### Mantener shell HTML y popover existentes

Motivo:

- reduce riesgo visual
- mantiene CSS y layout prácticamente intactos

Tradeoff:

- la Timeline sigue dependiendo de JS para poblar entradas
- pero el contenedor estable minimiza el cambio estructural

## Detalles importantes de implementación

- `renderTimelineSection()` re-renderiza la strip sin tocar el shell del popover
- `initTimelineInteractions()` conecta una sola escucha delegada
- `showTimelinePopover()` ya no lee desde `sessionStorage.strings`
- `updateTimelineUiLabels()` localiza `aria-label` del diálogo y del cierre
- `syncTimelineExpandedState()` mantiene coherencia entre popover y trigger

## Validaciones realizadas

### Validación estructural

- `python3 -m json.tool data/strings.json`
- comprobación de claves `data-i18n` frente a `strings.json`
- búsqueda de referencias legacy de Timeline en HTML y JS

### Validación en navegador

Se sirvió la web localmente con:

```bash
python3 -m http.server 8000
```

Y se ejecutó un harness temporal en Chrome headless que verificó:

- render correcto de 7 entradas de Timeline
- render correcto en `en`, `es` y `ja`
- apertura del popover
- cierre con botón
- restauración de foco al trigger
- persistencia del popover al cambiar idioma
- cierre por outside-click

## Posibles regresiones a testear

- cambio de orientación en móvil con el popover abierto
- longitudes de texto en japonés dentro del popover
- futuras entradas con más bullets o tags técnicos
- interacción del popover con lectores de pantalla
- convivencia entre popover abierto y navegación por sidebar

## Archivos modificados

- `index.html`
- `assets/css/styles.css`
- `js/main.js`
- `data/strings.json`
- `data/timeline.js`
- `docs/README.md`
- `docs/COMPONENT_STRUCTURE.md`
- `docs/JAVASCRIPT_FUNCTIONS.md`
- `docs/TRANSLATIONS.md`
- `docs/UI_LAYOUT.md`
- `docs/DESIGN_DECISIONS.md`
- `docs/SITE_MAP.md`
- `docs/TRANSLATION_COMPARISON.md`
- `docs/TIMELINE_STRUCTURE.md`

## Conclusión

La Timeline queda ahora alineada con la arquitectura data-driven del resto del portfolio, con menor duplicación, mejor mantenibilidad y una base mucho más clara para añadir nuevas entradas sin tocar HTML repetido ni expandir `strings.json` con contenido que no es UI.
