import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";

type BlogPostPageProps = PageProps<"/blog/[slug]">;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    image: absoluteUrl(post.image),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <PageHero title={post.title} subtitle={post.excerpt} image={post.image} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-body">
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.author}
          </p>
          <div className="prose-content mt-8">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
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
          <p className="mt-10 text-sm">
            <Link href="/blog" className="font-semibold text-brand">
              ← All articles
            </Link>
          </p>
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="896px"
          />
        </div>
      </Section>
    </>
  );
}
