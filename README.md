# Mahraj Fencing

Production-ready marketing site for **Mahraj Fencing**: perimeter supply and field services across UAE & KSA. Built with Next.js 16, React 19, Tailwind CSS 4, and typed static content modules (no CMS).

## Requirements

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Project structure

- `src/app/`: App Router pages, metadata, sitemap, robots, manifest
- `src/content/`: Typed site copy, products, services, projects, blog
- `src/components/`: Layout, home sections, UI, SEO helpers
- `src/lib/`: `cn()` utilities and `buildMetadata()` SEO helper
- `public/`: Brand assets and photography (`/brand`, `/images`)

## Content updates

Edit the relevant file under `src/content/` and rebuild. Product, service, project, and blog detail routes use `generateStaticParams` for static generation.

## Deployment

Set `siteConfig.url` in `src/content/site.ts` to your production domain before launch. Run `npm run build` and deploy the `.next` output with your hosting provider (Vercel, Node server, etc.).

## Contact (site defaults)

- KSA: +966 56 602 1891  
- UAE: +971 50 882 2414  
- Email: Waseem@mahraj.com  
