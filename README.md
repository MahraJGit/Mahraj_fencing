# Mahraj Fencing

Production-ready marketing site for **Mahraj Fencing**: perimeter supply and field services across UAE & KSA. Built with Next.js 16, React 19, Tailwind CSS 4, and typed content modules, with Supabase-backed blog publishing.

## Requirements

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in the values for local development. Environment files are excluded from Git.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Project structure

- `src/app/`: App Router pages, metadata, sitemap, robots, manifest
- `src/content/`: Typed site copy, products, services, and projects
- `src/components/`: Layout, home sections, UI, SEO helpers
- `src/lib/`: Shared utilities, admin functionality, and Supabase integration
- `public/`: Brand assets and photography (`/brand`, `/images`)

## Content updates

Edit the relevant file under `src/content/` and rebuild for static product, service, and project content.

## Admin blog publishing

Admin blog posts are stored in Supabase and published posts are rendered from Supabase on the public blog routes. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local` for local development and in your hosting provider for deployments.

Before using blog administration, configure the `blog_posts` table, row-level security policies, and the `blog-images` Storage bucket and policies in Supabase. The project-specific setup SQL is kept locally in the ignored `supabase/` folder and is not included in Git; arrange access to that script separately when setting up a fresh clone. The admin email configured in `.env.local` must match the email allowed by the database policies.

After editing environment variables, restart the dev server. Changes made to the old browser-local blog preview are not automatically migrated.

## Deployment

Set `siteConfig.url` in `src/content/site.ts` to your production domain before launch. Run `npm run build` and deploy the `.next` output with your hosting provider (Vercel, Node server, etc.).

## Contact (site defaults)

- KSA: +966 56 602 1891  
- UAE: +971 50 882 2414  
- Email: Waseem@mahraj.com  
