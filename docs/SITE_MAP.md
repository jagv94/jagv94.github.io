# Site Map

## Vista general

El portfolio es una `single-page experience` con navegacion por anclas. La unica excepcion es el acceso a recursos externos o a la subpagina jugable `GhostNGoblins/GhostNGoblins.html`.

## Mapa de secciones

| ID / ruta | Tipo | Proposito | Entradas | Salidas / CTA |
| --- | --- | --- | --- | --- |
| `#home` | `header.hero-section` | Presentacion principal y posicionamiento profesional | carga inicial, `nav_home` | scroll indicator a `#featured-projects` |
| `#skills` | bloque interno del hero | Mostrar stack principal y secundarios | parte del hero | toggle `more/less` |
| `#featured-projects` | seccion principal | Mostrar tres casos de estudio prioritarios | sidebar, scroll indicator | PDF TFG, enlaces a itch.io |
| `#timeline` | seccion de CV | Mostrar recorrido profesional y academico | sidebar | descarga CV + popover de detalle |
| `#portfolio` | grid de archivo | Mostrar el resto del portfolio en vista compacta | sidebar | filtros + links externos + `GhostNGoblins.html` |
| `#contact` | cierre de pagina | CTA laboral final | sidebar | `mailto:` |
| `GhostNGoblins/GhostNGoblins.html` | pagina separada | Proyecto jugable educativo | card del archive | sin retorno integrado al portfolio |

## Navegacion primaria

### Sidebar desktop

- Siempre visible a la izquierda.
- Anchors internas:
  - `#home`
  - `#featured-projects`
  - `#timeline`
  - `#portfolio`
  - `#contact`
- Bloque de idiomas.
- Bloque social.
- Email persistente.

### Sidebar movil

- Se abre con `#sidebarToggle`.
- Usa overlay `#sidebarOverlay`.
- Se cierra al:
  - pulsar overlay,
  - pulsar un enlace interno,
  - volver a pulsar el toggle.

## Flujo de scroll

El orden narrativo del portfolio es lineal:

1. `Hero`
2. `Featured Projects`
3. `Resume / Timeline`
4. `Project Archive`
5. `Contact`

Ese flujo esta reforzado por:

- el `scrollIndicator` del hero,
- el orden de la sidebar,
- el hecho de que los featured projects aparecen antes que el timeline,
- el CTA final aislado en la ultima seccion.

## Jerarquia visual y de lectura

### Nivel 1

- Nombre del autor.
- Subtitulo profesional.
- Secciones `Featured Projects`, `Resume`, `Project Archive`, `Contact`.

### Nivel 2

- Paneles destacados expandibles.
- CTA de CV.
- Tarjetas del timeline.
- Tarjetas del archive.

### Nivel 3

- Bullets de contribucion.
- Tech tags del popover.
- Descripciones secundarias de proyectos.

## Relacion entre secciones

| Seccion origen | Relacion con | Motivo |
| --- | --- | --- |
| Hero | Featured Projects | El hero define la propuesta de valor; la siguiente seccion la demuestra con casos concretos. |
| Featured Projects | Timeline | Primero se muestra trabajo, luego trayectoria. |
| Timeline | Project Archive | Tras la credibilidad profesional, se abre el catalogo completo. |
| Project Archive | Contact | El cierre busca convertir interes en contacto. |

## CTAs principales

| CTA | Ubicacion | Tipo |
| --- | --- | --- |
| `Read Thesis (PDF)` / equivalente traducido | featured + archive TFG | recurso documental |
| `Visit Page` / `Visit Page` traducido | featured + archive externos | salida a itch.io / YouTube |
| `Play Now` | card de `GhostNGoblins` | navegacion a subpagina interna |
| `View Full Resume` | seccion timeline | descarga / visualizacion PDF |
| `Get In Touch` | seccion contact | `mailto:` |
| enlaces sociales | footer de sidebar | salida externa |

## Relaciones con paginas externas

### Recursos locales

- `assets/docs/Guia_para_el_Desarrollo_de_Interacciones_en_VR-Guerra_Viudez_Jose_Adrian.pdf`
- `assets/docs/Adrian_Guerra_CV_es.pdf`
- `assets/docs/Adrian_Guerra_CV_en.pdf`
- `GhostNGoblins/GhostNGoblins.html`

### Recursos externos

- `itch.io` para varios proyectos.
- `YouTube` para `Towers of Clickanium`.
- `LinkedIn`, `GitHub`, `Twitter/X`.

## Notas de arquitectura de navegacion

- El scroll suave se aplica solo a enlaces internos con `href` tipo `#...`.
- En movil se resta un offset de `75px` para no tapar el destino.
- No existe router ni cambio de vista SPA; todo se resuelve en DOM unico.
- Los filtros del archive no cambian ruta ni hash; solo alteran visibilidad de tarjetas.
