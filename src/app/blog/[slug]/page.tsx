import Image from "next/image";
import Link from "next/link";
import { io } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { getPublishedBlog } from "@/lib/admin/blogs";
import { prepareBlogContent } from "@/lib/blog-toc";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";

type BlogPostPageProps = PageProps<"/blog/[slug]">;

export async function generateMetadata(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = await getPublishedBlog(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default function BlogPostPage(props: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-40 items-center justify-center text-sm text-body">
          Loading article…
        </div>
      }
    >
      <BlogPostContent params={props.params} />
    </Suspense>
  );
}

async function BlogPostContent({
  params,
}: {
  params: BlogPostPageProps["params"];
}) {
  await io();
  const { slug } = await params;
  const post = await getPublishedBlog(slug);
  if (!post) notFound();
  const { content, headings } = prepareBlogContent(post.bodyHtml);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
    },
    image: absoluteUrl(post.image),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        image={post.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <Section>
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.author.name}</span>
          </div>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1312px) 1280px, calc(100vw - 2rem)"
            />
          </div>
          {headings.length ? (
            <details className="mt-8 rounded-lg border border-border bg-surface-alt/60 p-5">
              <summary className="cursor-pointer font-semibold text-ink">
                Table of contents
              </summary>
              <nav aria-label="Table of contents">
                <ol className="mt-3 list-inside list-decimal space-y-2 text-sm">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={
                        heading.level > 1 ? "ml-5 text-body" : "text-ink"
                      }
                    >
                      <a
                        href={`#${heading.id}`}
                        className="hover:text-brand hover:underline"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          ) : null}
          <div
            className="prose-content prose-admin mt-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {post.tags.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-charcoal"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {post.faqs.length ? (
            <section className="mt-12" aria-labelledby="article-faqs">
              <h2
                id="article-faqs"
                className="font-heading text-2xl font-semibold text-ink"
              >
                Frequently asked questions
              </h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {post.faqs.map((faq, index) => (
                  <details key={`${faq.question}-${index}`} className="py-4">
                    <summary className="cursor-pointer font-semibold text-ink">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-relaxed text-body">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
          {post.author.bio || post.author.image ? (
            <aside className="mt-12 flex gap-4 rounded-lg border border-border bg-surface-alt/60 p-5">
              {post.author.image ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : null}
              <div>
                <p className="font-semibold text-ink">{post.author.name}</p>
                {post.author.role ? (
                  <p className="mt-0.5 text-sm text-brand">{post.author.role}</p>
                ) : null}
                {post.author.bio ? (
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {post.author.bio}
                  </p>
                ) : null}
              </div>
            </aside>
          ) : null}
          <p className="mt-10 text-sm">
            <Link href="/blog" className="font-semibold text-brand">
              ← All articles
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
