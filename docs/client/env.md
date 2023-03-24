# ENV variable documentation

## Navigation

1. [..](../)
1. [Directories](./dirs.md)
1. [Environment variables](./env.md)
1. [Testing](./tests.md)

## ASSETS_BASE

- Type: `Path` (`string`).
- Purpose: Defines the base path for assets, ie. the path that is prepended to the resulting paths (`src/assets/`, later translated to `$ASSETS_BASE/assets/`). Assets are imported using `import` statements in `.tsx` files ([vite docs](https://vitejs.dev/guide/assets.html)):

```ts
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

- Example: `ASSETS_BASE=/~ts438730/io/client/public/`.
- Defined in: `.env.production` for production (default for `npm build`), `.env.development` for development (default for `npm run dev`).

## API_BASE

- Type: `Url` (`string`)
- Purpose: Serves as the base for api call urls: `$API_BASE/endpoint`.
- Example: `0.0.0.0:8000`
- Defined in: `.env.production`, `.env.development`
