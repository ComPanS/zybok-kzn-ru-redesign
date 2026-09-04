# «Зубок» — independent website redesign concept

A local, multi-page React/Vite modernization of the public website at [zybok-kzn.ru](http://zybok-kzn.ru/). The concept preserves the clinic’s factual content, recognizable blue tooth identity, real team portraits, public documents, contact details, and source-listed price examples.

> This is an independent design concept. It is not affiliated with or endorsed by ООО «Зубная Клиника» and does not replace the clinic’s official website.

## Run

```bash
npm install
npm run dev
npm run build
npm run preview
npm run qa
```

The checked production build is generated in `dist/`. Secondary routes have real HTML shells so direct loads and refreshes work on static hosting.

## Documentation

- `SOURCE_AUDIT.md` — captured business facts, verified public emails, and mobile finding
- `source-prices.json` — raw structured extraction from the four supplied public price pages
- `src/content/prices.json` — normalized catalog with 96 priced services and 9 grouping rows
- `ROUTE_INVENTORY.md` — source-to-concept information architecture
- `ASSET_SOURCES.md` — image provenance and usage notes
- `DESIGN.md` — design tokens, rationale, and anti-patterns
- `HANDOFF.md` — change summary, assumptions, and verification record
- `audit/` — comparable original and redesigned screenshots

## Important

The local telephone links are functional. No contact form, appointment data collection, payment, or tracking is implemented. Source images and documents remain subject to their owner’s rights and must be reviewed before public publication or production use.
