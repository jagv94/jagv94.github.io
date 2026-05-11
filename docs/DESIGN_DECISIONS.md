# Design Decisions

## Objetivo del portfolio

El portfolio esta diseñado para vender un perfil hibrido:

- game design,
- systems design,
- implementacion tecnica,
- y especializacion VR/XR.

La estructura no intenta ser un portfolio artistico generalista ni una landing corporativa. Prioriza que un recruiter o lead entienda rapido:

1. quien es el autor,
2. en que tipo de trabajo aporta valor,
3. que proyectos justifican esa propuesta,
4. y como contactar.

## Decisiones visuales

### Direccion estetica

- fondo oscuro con gradientes y particulas
- acento neon violeta
- glow, blur y glassmorphism
- paneles inclinados en featured projects

Esto construye una identidad cercana a:

- tecnologia,
- videojuego,
- ciencia ficcion ligera,
- y portfolio personal con fuerte sesgo interactivo.

### Tipografia

- `Rajdhani` para tono tecnico / sci-fi
- `Zen Maru Gothic` para titulares y labels con un matiz mas distintivo

### Sistema de contraste

- fondo muy oscuro
- texto claro
- acento luminoso para CTAs, focus visual y separadores

## Decisiones de UX

### Single-page scroll

Elegida para reducir friccion:

- no obliga a abrir varias paginas,
- concentra narrativa,
- facilita lectura secuencial.

### Featured before Resume

Primero se enseña el trabajo, luego la trayectoria. Es una decision acertada para portfolios de producto/juego, donde el caso de estudio suele vender mejor que el CV puro.

### Timeline con popover

La experiencia se resume en nodos compactos y el detalle solo aparece al pedirlo. Eso mejora densidad informativa, aunque sacrifica algo de accesibilidad y descubribilidad.

### Archive filtrable

Convierte el resto de proyectos en catalogo navegable sin quitar foco a los tres principales.

### Localizacion visible desde la sidebar

Da acceso rapido a idiomas sin recargar rutas distintas, lo cual ayuda en contexto internacional.

## Fortalezas actuales

| Area | Fortaleza |
| --- | --- |
| Narrativa | El orden hero -> featured -> resume -> archive -> contact esta bien pensado para recruiters. |
| Diferenciacion visual | Los paneles destacados y el tono neon hacen el sitio reconocible. |
| Escaneabilidad | Skills pills, timeline y tech tags hacen que el contenido tecnico sea rapido de leer. |
| Internacionalizacion | El sitio soporta tres idiomas sin duplicar paginas. |
| Accesibilidad parcial | Hay soporte para `prefers-reduced-motion` y algunos atributos ARIA. |

## Posibles limitaciones estructurales detectadas

### 1. Localizacion incompleta

No todo el texto visible pasa por `strings.json`. Quedan sin traducir:

- filtros del archive,
- skill pills,
- tooltips/codigos de idioma,
- varios titulos de proyecto,
- labels `project-role`.

### 2. Duplicacion de contenido

Los mismos proyectos aparecen en featured y archive con estructuras distintas y fuentes parciales distintas. Eso sube el coste de mantenimiento.

### 3. Footer sin contenido

Hay claves de footer en JSON y estilos CSS, pero el HTML no renderiza copy real. La UI sugiere un cierre que no llega a materializarse.

### 4. Dependencia de JS para estado correcto

- el idioma visible depende de `fetch()`
- el enlace inicial del CV es incorrecto hasta que JS lo corrige

### 5. Accesibilidad mejorable

- `timeline-item` son `div` clicables, no botones
- los featured panels no tienen control teclado equivalente
- el popover no gestiona foco ni focus trap
- `scrollIndicator` es clicable, pero no es un boton semantico

### 6. Fragilidad del sistema de datos

No hay modelo unificado de proyectos ni validacion automatica de claves i18n. El sistema funciona, pero depende mucho de consistencia manual.

## Decisiones tecnicas con impacto UX

### Positivas

- cache de traducciones en `sessionStorage`
- cierre automatico de sidebar en movil
- `prefers-reduced-motion` para particulas, loader y scroll
- resize debounce para galeria destacada

### Con deuda

- texto default del HTML y texto final en `strings.json` no siempre coinciden
- placeholder de logos inexistente
- algunas piezas JS (`fade-in`, `.hero-btn`) ya no tienen consumidor real

## Lectura final

El portfolio tiene una direccion clara y bastante personalidad. La mayor parte de las decisiones UX/UI empujan en la direccion correcta para un perfil tecnico-creativo de videojuegos. La deuda no esta en la propuesta visual, sino en:

- mantener el sistema de contenido,
- cerrar huecos de localizacion,
- y reforzar accesibilidad / consistencia.
