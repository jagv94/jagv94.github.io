# Translations

## Idiomas soportados

- `en`
- `es`
- `ja`

El fallback global sigue siendo `en`.

## Fuentes de localización

### `data/strings.json`

Se usa solo para UI compartida:

- navegación
- hero
- labels `more/less`
- CTA de CV
- texto de contacto
- CTA genéricos (`visit`, `play`, `tfg-link-pdf`)
- texto de transición del archive
- labels del popover de timeline

### `data/projects.js`

Se usa para copy localizado por proyecto:

- títulos
- meta featured
- descripciones featured
- descripciones archive
- contribuciones
- notas

### `data/timeline.js`

Se usa para contenido localizado de trayectoria:

- títulos visibles
- roles
- fechas
- institución o empresa
- línea visible de contexto
- bullets
- tech tags
- alt de logos

## Flujo real

1. `main.js` resuelve `lang`
2. renderiza proyectos inmediatamente con fallback local
3. renderiza timeline inmediatamente desde `timeline.js`
4. intenta aplicar `sessionStorage.strings`
5. hace `fetch("data/strings.json")`
6. reaplica traducciones y re-renderiza proyectos + timeline

## Fallback visible

### Cubierto

- el HTML por defecto ya coincide con el inglés actual de `strings.json`
- el render de proyectos puede construirse antes de terminar la carga de traducciones
- la timeline puede construirse antes de terminar la carga de traducciones
- `projectUiFallbacks` cubre labels mínimos para evitar CTA o `aria-label` vacíos

### No cubierto

- los filtros del archive siguen fijos en inglés
- las skill pills siguen fijas

## Claves usadas de forma dinámica

- `less_skills`
- `play`
- `visit`
- `tfg-link-pdf`
- `project_contributions_title`
- `project_archive_intro`
- `timeline_dialog_label`
- `timeline_close_label`

## Limpieza aplicada

Se eliminaron de `strings.json` todas las claves de Timeline que representaban contenido real:

- títulos de cada entrada
- fechas
- lugares
- payload completo del popover

Ese contenido vive ahora en `data/timeline.js`, igual que el catálogo de proyectos vive en `data/projects.js`.

## Nota estructural

El sistema actual separa:

- `strings.json` para UI compartida,
- `projects.js` para contenido de proyectos,
- `timeline.js` para contenido de trayectoria.

Eso reduce drift y evita tocar varias capas para actualizar una sola entrada.
