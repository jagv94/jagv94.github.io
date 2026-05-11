# UI Layout

## Estructura global

El layout sigue apoyándose en:

- `aside.sidebar` fijo en desktop,
- drawer lateral en pantallas menores de `1200px`,
- `.main-content` como columna principal de lectura.

## Hero

Jerarquía actual:

1. nombre
2. subtítulo profesional
3. párrafo de posicionamiento
4. skill pills
5. language pills
6. scroll indicator

No se añadió ningún CTA nuevo en el hero.

## Featured Projects

### Desktop

- mantiene el patrón editorial de 3 paneles inclinados,
- la expansión sigue ocurriendo debajo del panel activo,
- y el resto de paneles se atenúa con `other-panel`.

### Móvil

- los paneles pasan a columna,
- el contenido expandido reemplaza la miniatura dentro de la card,
- el panel abierto no se cierra por `resize` de altura,
- y los CTA internos quedan clicables.

## Timeline

### Strip principal

- mantiene nodos compactos en línea,
- conserva la línea central y el peso visual existente,
- pero ahora se renderiza dinámicamente desde `data/timeline.js`.

### Semántica e interacción

- cada nodo de timeline ahora es un botón real,
- el hover visual se mantiene igual,
- y el foco visible usa el mismo lenguaje visual del glow.

### Popover

- mantiene el patrón central con glassmorphism,
- sigue mostrando logo, entidad, rol, bullets y tech tags,
- y ya puede mantenerse coherente si se cambia de idioma con el popover abierto.

## Transición hacia el archive

Se mantiene el texto sutil bajo el título de `Project Archive`:

```text
Additional projects, prototypes and game jam work can be found in the archive below.
```

Su función es enlazar visualmente los case studies destacados con el catálogo secundario.

## Archive

### Grid

- sigue usando `display: grid`,
- mantiene filtros por clase,
- y conserva un peso visual menor que featured.

### Nueva jerarquía interna de card

Cada card puede mostrar:

- título,
- resumen corto opcional,
- lista compacta de contribuciones,
- CTA.

### Comportamiento por tipo de dispositivo

- en desktop el overlay sigue apareciendo por hover/focus,
- en dispositivos táctiles el overlay pasa a layout visible dentro de la card para que el contenido y el CTA sigan siendo accesibles.

## Contact y footer

- el bloque de contacto mantiene una sola llamada a la acción,
- el footer sigue vacío a nivel de copy.

## Cambios UX reflejados

- featured mobile ahora es más estable,
- timeline requiere menos mantenimiento estructural,
- el popover de timeline responde mejor a teclado y cambio de idioma,
- y el archive comunica mejor qué es el juego y qué aportación personal hubo.
