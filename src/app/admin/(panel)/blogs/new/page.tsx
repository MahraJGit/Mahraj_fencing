import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">New blog post</h1>
        <p className="mt-1 text-sm text-body">
          Write with the rich text editor and insert custom HTML blocks when needed.
        </p>
      </div>
      <BlogForm mode="create" />
    </div>
  );
}
