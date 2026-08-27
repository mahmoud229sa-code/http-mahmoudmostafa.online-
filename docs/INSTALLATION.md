# Installation

## Static deployment

Upload the contents of `public/` to any static host. The main entry point is `public/index.html`.

## Netlify

The repository already contains `netlify.toml` with `public` as the publish directory. Connect the repository to Netlify and deploy.

## Local Express server

Requires Node.js 18 or newer:

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Supabase

The browser client configuration is in `public/assets/js/supabase-config.js`. The publishable client key is intended for browser use; never add passwords or service-role keys there. Run `database/supabase-schema.sql` in the connected Supabase project before using visitor tracking, orders, or the admin dashboard.
