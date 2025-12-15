# React Feature Showcase

A beginner-friendly single-page React app built with Vite. It demonstrates foundational React
concepts—state, props, effects, context, reducers, memoization, refs, and controlled forms—with
concise, interactive examples.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

If you run into network limitations in this environment, you can still read the source files and
`DOCS.md` for a guided tour of the showcased patterns.

## Troubleshooting installs

If `npm install` fails with a `403 Forbidden` error (commonly for `@vitejs/plugin-react` behind a
corporate proxy or locked-down registry), try the following:

1. **Pin the public registry** for the Vite packages to bypass blocked mirrors:
   ```bash
   npm config set registry https://registry.npmjs.org/ --location project
   npm config set @vitejs:registry https://registry.npmjs.org/ --location project
   ```
2. **Clear proxy overrides** that may be forcing requests through an invalid endpoint:
   ```bash
   npm config delete proxy --location project
   npm config delete https-proxy --location project
   ```
3. **Retry the install**:
   ```bash
   npm install
   ```

If you are on a corporate network that enforces an internal registry, use that registry URL in step
1 instead of `registry.npmjs.org`, or ask your administrator to allow access to the Vite packages.
