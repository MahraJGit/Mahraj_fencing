begin;

alter table public.products
  add column if not exists featured_image text not null default '';

alter table public.services
  add column if not exists featured_image text not null default '';

alter table public.blog_posts
  add column if not exists featured_image text not null default '';

update public.products
set featured_image = image
where nullif(btrim(featured_image), '') is null;

update public.services
set featured_image = image
where nullif(btrim(featured_image), '') is null;

update public.blog_posts
set featured_image = image
where nullif(btrim(featured_image), '') is null;

commit;
