import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

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
      />
      <Section>
        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="grid overflow-hidden rounded-xl bg-background shadow-[0_12px_32px_-18px_rgba(18,20,23,0.3)] ring-1 ring-border/80 transition hover:ring-brand/25 md:grid-cols-[260px_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[160px]">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <time
                    dateTime={post.publishedAt}
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand"
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
                  <p className="mt-3 text-body leading-relaxed">{post.excerpt}</p>
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
    </>
  );
}
