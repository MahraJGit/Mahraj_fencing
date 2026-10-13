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
      <Section tone="alt">
        <ul className="space-y-8">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="grid gap-6 rounded-lg border border-border bg-background p-6 md:grid-cols-[240px_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md md:aspect-auto md:min-h-[140px]">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div>
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs font-semibold uppercase text-brand"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-2xl font-semibold text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-brand"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-body">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-brand"
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
