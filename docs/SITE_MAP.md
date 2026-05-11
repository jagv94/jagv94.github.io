# Site Map

## Vista general

El portfolio es una `single-page experience` con navegación por anclas. La única excepción es el acceso a recursos externos o a la subpágina jugable `GhostNGoblins/GhostNGoblins.html`.

## Mapa de secciones

| ID / ruta | Tipo | Propósito | Entradas | Salidas / CTA |
| --- | --- | --- | --- | --- |
| `#home` | `header.hero-section` | Presentación principal y posicionamiento profesional | carga inicial, `nav_home` | scroll indicator a `#featured-projects` |
| `#skills` | bloque interno del hero | Mostrar stack principal y secundarios | parte del hero | toggle `more/less` |
| `#featured-projects` | sección principal | Mostrar tres casos de estudio prioritarios | sidebar, scroll indicator | PDF TFG, enlaces a itch.io |
| `#timeline` | sección de CV | Mostrar recorrido profesional y académico | sidebar | descarga CV + popover de detalle |
| `#portfolio` | grid de archivo | Mostrar el resto del portfolio en vista compacta | sidebar | filtros + links externos + `GhostNGoblins.html` |
| `#contact` | cierre de página | CTA laboral final | sidebar | `mailto:` |
| `GhostNGoblins/GhostNGoblins.html` | página separada | Proyecto jugable educativo | card del archive | sin retorno integrado al portfolio |

## Navegación primaria

### Sidebar desktop

- siempre visible a la izquierda
- anchors internas:
  - `#home`
  - `#featured-projects`
  - `#timeline`
  - `#portfolio`
  - `#contact`
- bloque de idiomas
- bloque social
- email persistente

### Sidebar móvil

- se abre con `#sidebarToggle`
- usa overlay `#sidebarOverlay`
- se cierra al:
  - pulsar overlay
  - pulsar un enlace interno
  - volver a pulsar el toggle

## Flujo de scroll

El orden narrativo del portfolio es lineal:

1. `Hero`
2. `Featured Projects`
3. `Resume / Timeline`
4. `Project Archive`
5. `Contact`

Ese flujo está reforzado por:

- el `scrollIndicator` del hero
- el orden de la sidebar
- el hecho de que los featured projects aparecen antes que el timeline
- el CTA final aislado en la última sección

## Jerarquía visual y de lectura

### Nivel 1

- nombre del autor
- subtítulo profesional
- secciones `Featured Projects`, `Resume`, `Project Archive`, `Contact`

### Nivel 2

- paneles destacados expandibles
- CTA de CV
- botones del timeline
- tarjetas del archive

### Nivel 3

- bullets de contribución
- tech tags del popover
- descripciones secundarias de proyectos

## Relación entre secciones

| Sección origen | Relación con | Motivo |
| --- | --- | --- |
| Hero | Featured Projects | El hero define la propuesta de valor; la siguiente sección la demuestra con casos concretos. |
| Featured Projects | Timeline | Primero se muestra trabajo, luego trayectoria. |
| Timeline | Project Archive | Tras la credibilidad profesional, se abre el catálogo completo. |
| Project Archive | Contact | El cierre busca convertir interés en contacto. |

## CTAs principales

| CTA | Ubicación | Tipo |
| --- | --- | --- |
| `Read Thesis (PDF)` / equivalente traducido | featured + archive TFG | recurso documental |
| `Visit Page` / equivalente traducido | featured + archive externos | salida a itch.io / YouTube |
| `Play Now` | card de `GhostNGoblins` | navegación a subpágina interna |
| `View Full Resume` | sección timeline | descarga / visualización PDF |
| `Get In Touch` | sección contact | `mailto:` |
| enlaces sociales | footer de sidebar | salida externa |

## Relaciones con páginas externas

### Recursos locales

- `assets/docs/Guia_para_el_Desarrollo_de_Interacciones_en_VR-Guerra_Viudez_Jose_Adrian.pdf`
- `assets/docs/Adrian_Guerra_CV_es.pdf`
- `assets/docs/Adrian_Guerra_CV_en.pdf`
- `GhostNGoblins/GhostNGoblins.html`

### Recursos externos

- `itch.io` para varios proyectos
- `YouTube` para `Towers of Clickanium`
- `LinkedIn`, `GitHub`, `itch.io`

## Notas de arquitectura de navegación

- el scroll suave se aplica solo a enlaces internos con `href` tipo `#...`
- en móvil se resta un offset de `75px` para no tapar el destino
- no existe router ni cambio de vista SPA; todo se resuelve en DOM único
- los filtros del archive no cambian ruta ni hash; solo alteran visibilidad de tarjetas
- la Timeline se re-renderiza por idioma sin cambiar su shell ni duplicar listeners
