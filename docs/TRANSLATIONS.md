# Translations

## Idiomas soportados

- `en`
- `es`
- `ja`

El fallback global sigue siendo `en`.

## Fuentes de localización

### `data/strings.json`

Se usa para UI compartida y timeline:

- navegación
- hero
- labels `more/less`
- CTA de CV
- texto de contacto
- CTA genéricos (`visit`, `play`, `tfg-link-pdf`)
- texto de transición del archive
- timeline visible
- popover del timeline

### `data/projects.js`

Se usa para copy localizado por proyecto:

- títulos
- meta featured
- descripciones featured
- descripciones archive
- contribuciones
- notas

## Flujo real

1. `main.js` resuelve `lang`
2. renderiza proyectos inmediatamente con fallback local
3. intenta aplicar `sessionStorage.strings`
4. hace `fetch("data/strings.json")`
5. reaplica traducciones y rerenderiza proyectos

## Fallback visible

### Cubierto

- el HTML por defecto ya coincide con el inglés actual de `strings.json`
- el render de proyectos puede construirse antes de terminar la carga de traducciones
- `projectUiFallbacks` cubre labels mínimos para evitar CTA vacíos

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

## Limpieza aplicada

Se eliminaron de `strings.json` las claves de proyecto que ya no tenían sentido tras centralizar el catálogo, además de claves huérfanas de UI que no se renderizaban.

## Nota estructural

El timeline mantiene una estructura híbrida:

- shell visible en HTML
- detalle profundo en `strings.json`

Los proyectos, en cambio, ya no viven en HTML ni en el JSON de traducciones.
