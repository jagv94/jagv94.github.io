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

## Transición hacia el archive

Se añadió un texto sutil justo bajo el título de `Project Archive`:

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

## Timeline

No cambió la estructura base:

- nodos compactos en línea,
- popover central con glassmorphism,
- detalle cargado desde traducciones.

## Contact y footer

- el bloque de contacto mantiene una sola llamada a la acción,
- el footer sigue vacío a nivel de copy.

## Cambios UX reflejados

- featured mobile ahora es más estable,
- el archive comunica mejor qué es el juego y qué aportación personal hubo,
- y la transición entre secciones reduce el salto entre case study y catálogo.
