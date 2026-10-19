import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { io } from "next/cache";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import { getFeaturedBlogs } from "@/lib/admin/blogs";

export function HomeFeaturedBlogs() {
  return (
    <Suspense fallback={null}>
      <FeaturedBlogsContent />
    </Suspense>
  );
}

async function FeaturedBlogsContent() {
  await io();
  const posts = await getFeaturedBlogs();

  if (posts.length === 0) return null;

  return (
    <section className="bg-paper py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Featured insights</Eyebrow>
            <h2 className="mt-3 font-heading text-[clamp(2.5rem,5vw,3.625rem)] font-bold uppercase leading-none text-ink">
              From our team.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            View all articles <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/9] overflow-hidden"
                  aria-label={`Read ${post.title}`}
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
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
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-brand"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-body">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:text-brand-dark"
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
