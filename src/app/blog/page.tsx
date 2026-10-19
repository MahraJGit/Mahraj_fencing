import Image from "next/image";
import Link from "next/link";
import { io } from "next/cache";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/admin/blogs";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata = buildMetadata({
  title: "Fencing insights",
  description:
    "Guides on perimeter specification, temporary fence operations, and gate automation for GCC sites.",
  path: "/blog",
  image: "/images/heroes/blogs-hero.png",
});

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHero
        title="Insights"
        subtitle="Practical notes for contractors and consultants specifying fence lines."
        image="/images/heroes/blogs-hero.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <Suspense
        fallback={
          <Section className="text-center">
            <p className="text-body">Loading articles…</p>
          </Section>
        }
      >
        <BlogListing />
      </Suspense>
      <CtaBanner />
    </>
  );
}

async function BlogListing() {
  await io();
  const posts = await getPublishedBlogs();
  const [featuredPost, ...morePosts] = posts;

  return (
    <>
      {featuredPost ? (
        <Section className="pb-8 sm:pb-10">
          <article className="grid overflow-hidden rounded-lg border border-border bg-white md:grid-cols-2">
            <div className="relative min-h-[240px] md:min-h-[360px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width:768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                {featuredPost.category}
              </p>
              <time
                dateTime={featuredPost.publishedAt}
                className="mt-4 text-sm text-body"
              >
                {new Date(featuredPost.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="transition hover:text-brand"
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="mt-4 leading-relaxed text-body">
                {featuredPost.excerpt}
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
              >
                Read the article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </Section>
      ) : (
        <Section className="text-center">
          <p className="text-body">There are no published articles yet.</p>
        </Section>
      )}
      {morePosts.length > 0 ? (
        <Section tone="alt">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              More from the team
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
              Practical site guides
            </h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {morePosts.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                      {post.category}
                    </p>
                    <time
                      dateTime={post.publishedAt}
                      className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-body"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-brand"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-body leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:text-brand-dark"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
