import React from "react";
import { getProductBySlugOrId, getProducts } from "@/lib/api";
import ProductDetailsClient from "@/components/ProductDetailsClient";

// Enable static generation for top products and dynamic fallback for others
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlugOrId(resolvedParams.slug);

  return (
    <ProductDetailsClient
      product={product}
      slug={resolvedParams.slug}
    />
  );
}
