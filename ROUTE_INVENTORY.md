# Route inventory

| Source URL | New route | Purpose | Global navigation | Primary action | Decision |
|---|---|---|---|---|---|
| `http://zybok-kzn.ru/` | `/` | Clinic overview and conversion | Logo | Call clinic | Full landing page |
| `/terapiya.html`, `/hirurgiya.html`, `/ortodontiya.html`, `/ortopediya.html`, `/implantologiya.html` | `/services` | Understand all specialties | Yes | Choose service / call | Collection index |
| Same five pages | `/services/:slug` | Explain a specialty | No; linked from index | Call / view prices | Reusable detail template, five real entries |
| `/nashi_sotrudniki.html` | `/doctors` | Select and trust a doctor | Yes | Call clinic | Full page |
| `/prays_list.html`, `/prays_list/terapiya.html`, `/prays_list/hirurgiya.html`, `/prays_list/ortopedicheskie_uslugi.html` | `/prices` | Full source-listed price catalog, examples, and caveat | Yes | Search prices / confirm cost by phone | Full searchable page: 96 priced services and 9 category rows |
| `/o_nas.html`, `/o_nas/litsenzii.html` | `/about` | Clinic principles, rooms, documents | Yes | View doctors / call | Full page |
| `/reviews.html` | `/reviews` | Preserve real patient feedback | Footer | Call clinic | Curated full page |
| `/kontakty.html` | `/contacts` | Address, schedule, calls, directions | Yes | Call / open map | Full conversion page |
| `/news.html` | — | Legacy article archive | No | — | Omitted from concept navigation; no dead link |
| `/vakansii.html` | — | Empty legacy page | No | — | Omitted from concept navigation |
| `/sitemap.html` | — | Legacy utility | No | — | Replaced by coherent header/footer navigation |

## Tested journey

`/` → `/services` → `/services/terapiya` → `/contacts` → `/`

All listed application routes receive real `dist/<route>/index.html` shells after build for direct loading and refresh on static hosting.
