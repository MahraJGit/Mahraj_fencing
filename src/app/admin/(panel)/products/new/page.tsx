import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">New product</h1>
        <p className="mt-1 text-sm text-body">
          Create a product with the same fields used on the frontend.
        </p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
