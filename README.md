# NanStar Workstation

NanStar Workstation is a personal command workstation for quick Git lookup, copying, and lightweight custom cards.

## Local Preview

```powershell
cd "D:\NanStar-Workstation"
node serve.js
```

Then open:

```text
http://127.0.0.1:4321/index.html
```

## Cloudflare Pages

This is a static site. Use these settings:

```text
Framework preset: None
Build command: leave empty
Build output directory: /
Root directory: /
Production branch: main
```

## Notes

Custom cards, favorites, theme, and language preferences are stored in browser local storage.

## Supabase Sync

The optional cloud sync stores only personal workstation state in Supabase:

- favorites
- custom cards
- theme
- language
- recent/frequency metadata

Create the table and RLS policies with:

```text
supabase-schema.sql
```

Only the Supabase publishable key is used in the browser. Do not expose `service_role` keys.
