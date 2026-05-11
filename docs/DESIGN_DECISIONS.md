# Design Decisions

## Objetivo del portfolio

El portfolio está diseñado para vender un perfil híbrido de:

- technical game design,
- systems design,
- implementación técnica,
- y especialización VR/XR.

La estructura no intenta ser un portfolio artístico generalista ni una landing corporativa. Prioriza que un recruiter o lead entienda rápido:

1. quién es el autor,
2. en qué tipo de trabajo aporta valor,
3. qué proyectos justifican esa propuesta,
4. y cómo contactar.

## Decisiones visuales

### Dirección estética

- fondo oscuro con gradientes y partículas
- acento neón violeta
- glow, blur y glassmorphism
- paneles inclinados en featured projects

### Tipografía

- `Rajdhani` para tono técnico / sci-fi
- `Zen Maru Gothic` para titulares y labels con un matiz más distintivo

### Sistema de contraste

- fondo muy oscuro
- texto claro
- acento luminoso para CTAs, focus visual y separadores

## Decisiones de UX

### Single-page scroll

Elegida para reducir fricción:

- no obliga a abrir varias páginas,
- concentra narrativa,
- facilita lectura secuencial.

### Featured before Resume

Primero se enseña el trabajo, luego la trayectoria. Es una decisión acertada para portfolios de producto/juego, donde el caso de estudio suele vender mejor que el CV puro.

### Timeline con popover

La experiencia se resume en nodos compactos y el detalle solo aparece al pedirlo. El refactor actual mantiene esa densidad, pero traslada el contenido a una fuente única y mejora la navegación por teclado al usar botones reales.

### Archive filtrable

Convierte el resto de proyectos en catálogo navegable sin quitar foco a los tres principales.

### Localización visible desde la sidebar

Da acceso rápido a idiomas sin recargar rutas distintas, lo cual ayuda en contexto internacional.

## Fortalezas actuales

| Área | Fortaleza |
| --- | --- |
| Narrativa | El orden hero -> featured -> resume -> archive -> contact está bien pensado para recruiters. |
| Diferenciación visual | Los paneles destacados y el tono neón hacen el sitio reconocible. |
| Escaneabilidad | Skills pills, timeline y tech tags hacen que el contenido técnico sea rápido de leer. |
| Internacionalización | El sitio soporta tres idiomas sin duplicar páginas. |
| Mantenibilidad | Proyectos y timeline ya no están duplicados entre HTML y traducciones. |

## Posibles limitaciones estructurales detectadas

### 1. Localización incompleta

No todo el texto visible pasa por el sistema i18n. Quedan sin traducir:

- filtros del archive,
- skill pills,
- tooltips y códigos de idioma.

### 2. Footer sin contenido

Hay estilos de footer, pero el HTML no renderiza copy real. La UI sugiere un cierre que no llega a materializarse.

### 3. Dependencia parcial de JS para estado final

- el idioma visible sigue dependiendo de `fetch()`
- timeline y proyectos se renderizan por JS a partir de sus fuentes de datos

### 4. Accesibilidad todavía mejorable

- los featured panels no tienen control teclado equivalente,
- el popover no implementa focus trap,
- `scrollIndicator` es clicable, pero no es un botón semántico.

## Decisiones técnicas con impacto UX

### Positivas

- cache de traducciones en `sessionStorage`
- cierre automático de sidebar en móvil
- `prefers-reduced-motion` para partículas, loader y scroll
- resize debounce para galería destacada
- delegación de eventos para Timeline
- rehidratación del popover al cambiar idioma

### Con deuda

- el HTML inicial del timeline ya no existe como fallback estático completo
- algunas piezas JS (`fade-in`, `.hero-btn`) siguen sin consumidor claro
- no hay validación automática de integridad para `projects.js` y `timeline.js`

## Lectura final

El portfolio tiene una dirección clara y bastante personalidad. La deuda principal ya no está en la duplicación de contenido, sino en:

- cerrar huecos de localización,
- reforzar accesibilidad,
- y automatizar algo mejor la validación de datos.
