# Maintenance Report 2026-05-11

## Resumen

Esta iteración se centró en mantenimiento incremental del portfolio, con prioridad en la UX móvil de `Featured Projects`, limpieza de duplicidades de datos y sincronización documental.

## Problemas detectados

### 1. Featured se cerraba en móvil durante scroll

Problema:

- la galería se reinicializaba en cualquier `resize`
- en móvil eso podía dispararse por cambios de altura del viewport durante scroll

Impacto:

- paneles que parecían cerrarse “solos”
- experiencia táctil frágil

### 2. CTA internos de Featured no estaban suficientemente blindados

Problema:

- la lógica de expansión convivía con clicks sobre contenido expandido
- los enlaces internos dependían de no colisionar con handlers del panel

Impacto:

- riesgo de taps ambiguos
- dificultad para confiar en los CTA dentro del panel expandido

### 3. Datos de proyectos duplicados

Problema:

- `index.html` repetía proyectos en featured y archive
- `strings.json` también contenía parte del copy de proyectos

Impacto:

- alto coste de mantenimiento
- drift entre fallback HTML, traducciones y render final

### 4. Archive con mezcla de resumen y contribución

Problema:

- muchas cards comprimían pitch del juego y rol personal en un solo párrafo

Impacto:

- lectura menos escaneable
- difícil separar contexto del juego de autoría real

### 5. Terminología profesional inconsistente

Problema:

- aún quedaban referencias visibles a `Game Designer` genérico

Impacto:

- positioning menos preciso para un perfil de diseño técnico

### 6. Twitter/X seguía visible

Problema:

- el enlace social seguía presente pese a estar inactivo

Impacto:

- ruido visual
- referencia pública a una cuenta no prioritaria

### 7. Fallback inglés imperfecto

Problema:

- había diferencias entre HTML base y el inglés final de `strings.json`
- el CV en HTML apuntaba a un PDF incorrecto

Impacto:

- flash de copy inconsistente
- dependencia mayor del JS para corregir el estado inicial

## Soluciones aplicadas

### Featured mobile

- se añadió un guardado de estado de viewport (`featuredViewportState`)
- los `resize` de solo altura ya no reinicializan la galería
- el panel móvil abierto se preserva si el layout real no cambia
- el click dentro de contenido expandido ya no reabre ni reinterpreta el panel
- el contenido expandido recupera `pointer-events: auto`
- los CTA y el botón `X` vuelven a ser clicables en touch
- el tap fuera de la sección featured cierra el panel móvil abierto

### Fuente única de proyectos

Se creó:

```text
data/projects.js
```

Contiene:

- títulos
- featured descriptions
- archive summaries
- contribution bullets
- imágenes
- categorías
- enlaces
- metadata de featured

`Featured Projects` y `Project Archive` ahora se renderizan desde esa fuente única.

### Archive refactor

- las cards soportan resumen corto opcional
- las contribuciones personales van en lista separada
- `Ghosts'N Goblins` recibió el set nuevo de bullets pedido
- el TFG también usa bullets en archive para mantener consistencia

### Traducciones

- `strings.json` se redujo a UI compartida + timeline
- se eliminaron claves legacy de proyectos ya no usadas
- se añadieron:
  - `project_archive_intro`
  - `project_contributions_title`
- el fallback inglés del HTML quedó alineado con `strings.json`

### Copy y presencia pública

- wording visible reforzado hacia `Technical Game Designer`
- enlace de Twitter/X retirado del sidebar
- referencia de Twitter retirada de `sameAs`
- metadatos principales actualizados para reflejar `Technical Game Designer Portfolio`

## Decisiones arquitectónicas

### Separar `strings.json` y `projects.js`

Motivo:

- mantener `strings.json` como UI compartida
- evitar un JSON enorme y duplicado con proyectos
- conservar render temprano sin framework ni build

Tradeoff:

- ahora hay dos fuentes de localización
- pero cada una tiene una responsabilidad mucho más clara

### Mantener HTML shell y no migrar de stack

Motivo:

- la web sigue siendo estática
- no hacía falta introducir framework ni abstracciones pesadas

## Detalles importantes de implementación

- `renderProjectSections()` re-renderiza featured y archive y reaplica estado activo
- `applyPortfolioFilter()` ya no depende de una lista estática de cards
- el overlay del archive se hace visible dentro de la card en dispositivos táctiles para no perder accesibilidad
- el CV por defecto en HTML ahora apunta a `assets/docs/Adrian_Guerra_CV_en.pdf`

## Validación realizada

### Automática ligera

- `python3 -m json.tool data/strings.json`
- comprobación de claves `data-i18n` vs `strings.json`
- render DOM con Chrome headless sobre servidor local

### Harness headless

Se validó con una página temporal servida localmente que:

- abrió un featured en modo móvil
- disparó un `resize` sin cambio de ancho
- comprobó que el panel seguía abierto
- verificó click en CTA interno
- verificó cierre con botón `X`
- verificó cierre por tap fuera en móvil
- verificó que desktop mantiene cierre por outside-click

Resultado esperado y obtenido:

- móvil: abierto antes y después de `resize`
- móvil: CTA clicable
- móvil: cierre correcto con `X` y con tap fuera
- desktop: CTA clicable y cierre al hacer click fuera

## Posibles regresiones a testear

- featured mobile al cambiar orientación
- featured desktop con cambios rápidos de tamaño de ventana
- archive en dispositivos táctiles con cards largas como `Ghosts'N Goblins`
- cambio de idioma con filtros del archive activos
- popover del timeline si se abre antes de que las traducciones terminen de cargar

## QA manual recomendado

### Desktop

- abrir y cerrar cada featured
- confirmar que solo hay 3 featured
- confirmar que los CTA de featured navegan correctamente
- comprobar cierre por click fuera
- filtrar archive por cada categoría
- revisar hover/focus del archive

### Mobile / touch

- abrir featured y hacer scroll sin que se cierre
- tocar CTA dentro de featured expandido
- tocar dentro del contenido expandido sin reactivar el panel
- cerrar con `X`
- cerrar tocando fuera de la sección featured
- revisar cards del archive y CTA visibles en touch

## Archivos afectados

- `index.html`
- `assets/css/styles.css`
- `js/main.js`
- `data/strings.json`
- `data/projects.js`
- documentación en `docs/`
