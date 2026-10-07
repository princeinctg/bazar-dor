import React from "react";
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
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
