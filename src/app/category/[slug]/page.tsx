import React, { Suspense } from "react";
import { getCategory, getProducts, getCategories } from "@/lib/api";
import CategoryPageClient from "@/components/CategoryPageClient";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function CategoryContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const resolvedParams = await paramsPromise;
  const slug = resolvedParams.slug;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  return (
    <CategoryPageClient
      category={category}
      initialProducts={products}
      slug={slug}
    />
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 animate-pulse">
          <div className="h-28 bg-white rounded-3xl border border-[#e5e7eb]" />
          <div className="h-14 bg-white rounded-2xl border border-[#e5e7eb]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white rounded-2xl border border-[#e5e7eb]"
              />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent paramsPromise={params} />
    </Suspense>
  );
}
