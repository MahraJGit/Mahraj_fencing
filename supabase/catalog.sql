create table if not exists public.products (
  slug text primary key,
  title text not null,
  short_description text not null,
  description text not null default '',
  category text not null check (
    category in (
      'perimeter-fencing',
      'gates-access',
      'barriers-security',
      'portable-structures',
      'signage-branding',
      'concrete-blocks',
      'accessories'
    )
  ),
  image text not null,
  image_alt text not null default '',
  gallery text[] not null default '{}',
  features text[] not null default '{}',
  applications text[] not null default '{}',
  seo jsonb not null default '{"title":"","description":""}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  slug text primary key,
  title text not null,
  summary text not null,
  description text not null default '',
  image text not null,
  image_alt text not null default '',
  highlights text[] not null default '{}',
  seo jsonb not null default '{"title":"","description":""}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catalog_seed_state (
  version text primary key,
  created_at timestamptz not null default now()
);

alter table public.products
  add column if not exists is_featured boolean not null default false;

alter table public.services
  add column if not exists is_featured boolean not null default false;

alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.catalog_seed_state enable row level security;

grant select on public.products, public.services to anon, authenticated;
grant insert, update, delete on public.products, public.services to authenticated;
grant select on public.catalog_seed_state to anon, authenticated;
grant insert, update on public.catalog_seed_state to authenticated;

drop policy if exists "Published products are publicly readable" on public.products;
create policy "Published products are publicly readable"
  on public.products for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admin can manage products" on public.products;
create policy "Admin can manage products"
  on public.products for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@fencing.com')
  with check ((auth.jwt() ->> 'email') = 'admin@fencing.com');

drop policy if exists "Published services are publicly readable" on public.services;
create policy "Published services are publicly readable"
  on public.services for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admin can manage services" on public.services;
create policy "Admin can manage services"
  on public.services for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@fencing.com')
  with check ((auth.jwt() ->> 'email') = 'admin@fencing.com');

drop policy if exists "Catalog seed state is publicly readable" on public.catalog_seed_state;
create policy "Catalog seed state is publicly readable"
  on public.catalog_seed_state for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can manage catalog seed state" on public.catalog_seed_state;
create policy "Admin can manage catalog seed state"
  on public.catalog_seed_state for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@fencing.com')
  with check ((auth.jwt() ->> 'email') = 'admin@fencing.com');

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'blog-images',
  'blog-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Catalog images are publicly readable" on storage.objects;
create policy "Catalog images are publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-images');

drop policy if exists "Admin can upload catalog images" on storage.objects;
create policy "Admin can upload catalog images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'blog-images'
    and (auth.jwt() ->> 'email') = 'admin@fencing.com'
  );

create or replace function public.set_catalog_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row
  execute function public.set_catalog_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
  before update on public.services
  for each row
  execute function public.set_catalog_updated_at();

create index if not exists products_public_catalog_order
  on public.products (sort_order, created_at)
  where status = 'published';

create index if not exists products_public_category_order
  on public.products (category, sort_order, created_at)
  where status = 'published';

create index if not exists services_public_order
  on public.services (sort_order, created_at)
  where status = 'published';

-- Seed the current catalog without replacing any database records.
insert into public.products (
  slug, title, short_description, description, category, image, image_alt, gallery, features, applications, seo, status, is_featured, sort_order
)
select seed.slug, seed.title, seed.short_description, seed.description, seed.category, seed.image, seed.image_alt, seed.gallery, seed.features, seed.applications, seed.seo, seed.status, seed.is_featured, seed.sort_order
from jsonb_to_recordset($catalog_products$[
  {
    "slug": "chain-link-fencing",
    "title": "Chain link fencing",
    "short_description": "Galvanized chain link for sites, sports, and industrial yards.",
    "description": "Heavy-gauge galvanized chain link fencing with steel posts and tension wire. Ideal for warehouses, utilities, schools, and construction hoarding when paired with privacy slats.",
    "category": "perimeter-fencing",
    "image": "/images/products/chain-link.jpg",
    "image_alt": "Chain link fencing",
    "gallery": [],
    "features": [
      "Hot-dip galvanized mesh",
      "Multiple heights and gauges",
      "Compatible with barbed wire toppers",
      "Fast supply across UAE & KSA"
    ],
    "applications": [
      "Industrial yards",
      "Sports courts",
      "Utility substations"
    ],
    "seo": {
      "title": "Chain link fencing supply & installation",
      "description": "Chain link fencing supplied and installed in Dubai, Abu Dhabi, Sharjah, and Riyadh. Galvanized mesh, posts, and accessories from Mahraj Fencing."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 0
  },
  {
    "slug": "welded-mesh-fencing",
    "title": "Welded mesh fencing",
    "short_description": "Rigid panels for clean lines and high-security perimeters.",
    "description": "Welded mesh panel fencing delivers a uniform aesthetic with strong anti-cut performance. Powder-coated finishes available for coastal and industrial environments.",
    "category": "perimeter-fencing",
    "image": "/images/products/welded-mesh.jpg",
    "image_alt": "Welded mesh fencing",
    "gallery": [],
    "features": [
      "Anti-cut welded panels",
      "Powder-coated options",
      "Concealed fixings available",
      "Modular panel heights"
    ],
    "applications": [
      "Data centers",
      "Logistics hubs",
      "Commercial compounds"
    ],
    "seo": {
      "title": "Welded mesh fencing panels",
      "description": "Welded mesh fencing for secure perimeters in the GCC. Supply, transport, and installation by Mahraj Fencing."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 1
  },
  {
    "slug": "palisade-fencing",
    "title": "Palisade fencing",
    "short_description": "High-security steel palisade with deterrent profile.",
    "description": "Steel palisade fencing with W or D profile pales, tamper-resistant fixings, and optional razor wire. Designed for utilities, oil & gas, and critical infrastructure.",
    "category": "perimeter-fencing",
    "image": "/images/products/palisade.jpg",
    "image_alt": "Palisade fencing",
    "gallery": [],
    "features": [
      "W/D profile pales",
      "Hot-dip galvanized steel",
      "Razor wire ready",
      "Engineered wind loading"
    ],
    "applications": [
      "Oil & gas facilities",
      "Substations",
      "Government sites"
    ],
    "seo": {
      "title": "Palisade security fencing",
      "description": "Palisade fencing supply and installation across UAE and Saudi Arabia. High-security perimeter systems from Mahraj Fencing."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 2
  },
  {
    "slug": "anti-climb-fencing",
    "title": "Anti-climb fencing",
    "short_description": "358 mesh and close-profile systems to deter scaling.",
    "description": "Anti-climb mesh fencing uses small apertures and rigid panels to prevent footholds. Often specified for data centers, airports, and high-value storage.",
    "category": "barriers-security",
    "image": "/images/products/anti-climb.jpg",
    "image_alt": "Anti-climb fencing",
    "gallery": [],
    "features": [
      "358 security mesh",
      "Minimal foothold aperture",
      "Integrates with detection systems",
      "Coastal-grade coatings"
    ],
    "applications": [
      "Data centers",
      "Aviation perimeters",
      "Cash handling"
    ],
    "seo": {
      "title": "Anti-climb security fencing",
      "description": "Anti-climb mesh and high-security fencing in Dubai and Riyadh. Spec-ready systems from Mahraj Fencing."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 3
  },
  {
    "slug": "temporary-fencing",
    "title": "Temporary fencing",
    "short_description": "Site hoarding panels with concrete block feet.",
    "description": "Temporary fence panels for construction, events, and phased works. Includes couplers, braces, and interlocking block feet for quick deployment and relocation.",
    "category": "perimeter-fencing",
    "image": "/images/products/temp-fence.jpg",
    "image_alt": "Temporary fencing",
    "gallery": [],
    "features": [
      "Quick-deploy panels",
      "Block feet and braces",
      "Branded mesh banners",
      "Shift-friendly layouts"
    ],
    "applications": [
      "Construction sites",
      "Events",
      "Roadworks"
    ],
    "seo": {
      "title": "Temporary construction fencing",
      "description": "Temporary fencing hire and supply with installation and shifting across UAE & KSA."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 4
  },
  {
    "slug": "security-gates",
    "title": "Security gates",
    "short_description": "Sliding and swing gates matched to your fence line.",
    "description": "Manual and automated security gates engineered to match palisade, mesh, or chain link systems. Includes guide tracks, motors, safety edges, and access control prep.",
    "category": "gates-access",
    "image": "/images/products/gates.jpg",
    "image_alt": "Security gates",
    "gallery": [],
    "features": [
      "Sliding & swing configurations",
      "Automation-ready",
      "Matching infill panels",
      "Safety compliance options"
    ],
    "applications": [
      "Industrial entrances",
      "Utility yards",
      "Campus access"
    ],
    "seo": {
      "title": "Security gates & automation",
      "description": "Security gate supply and installation (sliding and swing) across the GCC."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 5
  },
  {
    "slug": "crash-barriers",
    "title": "Crash barriers & road fencing",
    "short_description": "W-beam and pedestrian barriers for roads and car parks.",
    "description": "Galvanized crash barriers, guardrails, and pedestrian fencing for car parks, logistics yards, and roadworks. Installed to site drawings with proper anchorage.",
    "category": "barriers-security",
    "image": "/images/products/welded-mesh.jpg",
    "image_alt": "Crash barriers & road fencing",
    "gallery": [],
    "features": [
      "W-beam guardrail",
      "Pedestrian barrier panels",
      "Powder-coated finishes",
      "Site-specific layouts"
    ],
    "applications": [
      "Car parks",
      "Distribution centers",
      "Road projects"
    ],
    "seo": {
      "title": "Crash barriers & guardrails",
      "description": "Road and crash barrier supply with installation in UAE and KSA."
    },
    "status": "published",
    "is_featured": false,
    "sort_order": 6
  },
  {
    "slug": "portable-site-cabins",
    "title": "Portable site cabins",
    "short_description": "Site offices, storage, and welfare units.",
    "description": "Portable cabins for site offices, security booths, and storage. Delivered, positioned, and re-located as your project phases change.",
    "category": "portable-structures",
    "image": "/images/products/portable-cabin.jpg",
    "image_alt": "Portable site cabins",
    "gallery": [],
    "features": [
      "Office & storage layouts",
      "Electrical prep options",
      "Relocatable skids",
      "Fleet delivery"
    ],
    "applications": [
      "Construction HQ",
      "Security booths",
      "Temporary storage"
    ],
    "seo": {
      "title": "Portable site cabins",
      "description": "Portable cabins for construction and industrial sites, with supply and transport across the GCC."
    },
    "status": "published",
    "is_featured": false,
    "sort_order": 7
  },
  {
    "slug": "project-signage",
    "title": "Project signage & fence branding",
    "short_description": "Branded banners and safety boards for live sites.",
    "description": "Project signage including fence mesh banners, safety boards, and wayfinding panels. We align branding with your marketing team and install on active fence lines.",
    "category": "signage-branding",
    "image": "/images/gallery/03.jpg",
    "image_alt": "Project signage & fence branding",
    "gallery": [],
    "features": [
      "Mesh banner printing",
      "Safety & statutory boards",
      "Wind-load aware fixing",
      "Campaign swap-outs"
    ],
    "applications": [
      "Mega projects",
      "Retail fit-out",
      "Infrastructure"
    ],
    "seo": {
      "title": "Construction signage & fence branding",
      "description": "Project signage and fence branding for sites in Dubai, Abu Dhabi, Sharjah, and Riyadh."
    },
    "status": "published",
    "is_featured": false,
    "sort_order": 8
  },
  {
    "slug": "interlocking-concrete-blocks",
    "title": "Interlocking concrete blocks",
    "short_description": "Heavy blocks for fence feet and temporary walls.",
    "description": "Interlocking concrete blocks for temporary fence feet, kentledge, and low retaining runs. Delivered in volume with placement support on large sites.",
    "category": "concrete-blocks",
    "image": "/images/profile/steel-fabrication-workshop.jpg",
    "image_alt": "Interlocking concrete blocks",
    "gallery": [],
    "features": [
      "Fence foot ballast",
      "Interlocking geometry",
      "High-volume delivery",
      "Crane-friendly lifts"
    ],
    "applications": [
      "Temporary fence lines",
      "Hoarding",
      "Yard segregation"
    ],
    "seo": {
      "title": "Interlocking concrete blocks",
      "description": "Concrete blocks for fence ballast and site segregation, supplied across UAE & KSA."
    },
    "status": "published",
    "is_featured": false,
    "sort_order": 9
  },
  {
    "slug": "fence-accessories",
    "title": "Fence accessories & toppings",
    "short_description": "Posts, clamps, barbed wire, and privacy slats.",
    "description": "Complete accessory packs: posts, rails, clamps, barbed wire, razor coil, and privacy slats. Spec matched to your fence type with bulk pricing for contractors.",
    "category": "accessories",
    "image": "/images/products/chain-link.jpg",
    "image_alt": "Fence accessories & toppings",
    "gallery": [],
    "features": [
      "Post & rail systems",
      "Barbed & razor wire",
      "Privacy slats",
      "Contractor bulk packs"
    ],
    "applications": [
      "Contractor packages",
      "Maintenance",
      "Upgrades"
    ],
    "seo": {
      "title": "Fence accessories & hardware",
      "description": "Fence accessories, toppings, and hardware. Fast supply from Mahraj Fencing."
    },
    "status": "published",
    "is_featured": false,
    "sort_order": 10
  }
]$catalog_products$::jsonb)
as seed (
  slug text,
  title text,
  short_description text,
  description text,
  category text,
  image text,
  image_alt text,
  gallery text[],
  features text[],
  applications text[],
  seo jsonb,
  status text,
  is_featured boolean,
  sort_order integer
)
on conflict (slug) do nothing;

insert into public.services (
  slug, title, summary, description, image, image_alt, highlights, seo, status, is_featured, sort_order
)
select seed.slug, seed.title, seed.summary, seed.description, seed.image, seed.image_alt, seed.highlights, seed.seo, seed.status, seed.is_featured, seed.sort_order
from jsonb_to_recordset($catalog_services$[
  {
    "slug": "supply-and-branding",
    "title": "Fence supply & branding",
    "summary": "Bulk material supply with branded mesh banners and project boards.",
    "description": "We source fence panels, posts, gates, and accessories at scale, then add your branding on mesh banners and statutory boards. One team coordinates deliveries to match your programme.",
    "image": "/images/gallery/02.jpg",
    "image_alt": "Fence supply & branding",
    "highlights": [
      "Bulk panel & post supply",
      "Branded mesh banners",
      "Material scheduling to site",
      "GCC-wide logistics partners"
    ],
    "seo": {
      "title": "Fencing supply & branding",
      "description": "Fence material supply and site branding for projects in UAE and Saudi Arabia."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 0
  },
  {
    "slug": "installation",
    "title": "Installation",
    "summary": "Experienced crews for permanent and temporary fence lines.",
    "description": "Our installation teams deploy palisade, mesh, chain link, and temporary systems to engineer drawings. We coordinate with civil works, gate automation, and handover documentation.",
    "image": "/images/profile/modular-crane-install.jpg",
    "image_alt": "Installation",
    "highlights": [
      "Permanent & temporary systems",
      "Gate and access integration",
      "QA walkdowns and snag lists",
      "Night/weekend shifts available"
    ],
    "seo": {
      "title": "Fence installation services",
      "description": "Professional fence installation across Dubai, Abu Dhabi, Sharjah, and Riyadh."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 1
  },
  {
    "slug": "transport-and-logistics",
    "title": "Transportation",
    "summary": "Fleet delivery for panels, blocks, cabins, and accessories.",
    "description": "Dedicated transport for fence panels, concrete blocks, and portable cabins. We plan routes, crane lifts, and off-loading so your site stays productive.",
    "image": "/images/profile/steel-plant-yard.jpg",
    "image_alt": "Transportation",
    "highlights": [
      "Panel and block haulage",
      "Cabins and wide loads",
      "Off-loading coordination",
      "Cross-emirate routing"
    ],
    "seo": {
      "title": "Fence transport & logistics",
      "description": "Transport and logistics for fencing materials and site cabins in the GCC."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 2
  },
  {
    "slug": "shifting-and-relocation",
    "title": "Fence shifting",
    "summary": "Move temporary lines and cabins as your site footprint changes.",
    "description": "When phases move, we dismantle, shift, and re-install temporary fencing and cabins with minimal downtime. Ideal for infrastructure and phased construction.",
    "image": "/images/profile/porta-cabin-site-office.jpg",
    "image_alt": "Fence shifting",
    "highlights": [
      "Temporary line moves",
      "Cabins repositioning",
      "Inventory tracking",
      "Fast re-mobilisation"
    ],
    "seo": {
      "title": "Fence shifting & relocation",
      "description": "Temporary fence and cabin shifting services for active construction sites."
    },
    "status": "published",
    "is_featured": true,
    "sort_order": 3
  }
]$catalog_services$::jsonb)
as seed (
  slug text,
  title text,
  summary text,
  description text,
  image text,
  image_alt text,
  highlights text[],
  seo jsonb,
  status text,
  is_featured boolean,
  sort_order integer
)
on conflict (slug) do nothing;
