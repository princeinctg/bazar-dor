import React, { Suspense } from "react";
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

async function ProductContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const resolvedParams = await paramsPromise;
  const product = await getProductBySlugOrId(resolvedParams.slug);

  return (
    <ProductDetailsClient
      product={product}
      slug={resolvedParams.slug}
    />
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
          <div className="h-4 w-32 bg-[#f0f5f0] rounded" />
          <div className="h-40 bg-white rounded-3xl border border-[#e5e7eb]" />
          <div className="h-32 bg-white rounded-3xl border border-[#e5e7eb]" />
          <div className="h-64 bg-white rounded-3xl border border-[#e5e7eb]" />
        </div>
      }
    >
      <ProductContent paramsPromise={params} />
    </Suspense>
  );
}
