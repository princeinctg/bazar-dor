import React from "react";
import Hero from "@/components/Hero";
import HomeProductSections from "@/components/HomeProductSections";
import { getProducts, getTopRisers, getTopFallers } from "@/lib/api";

export default async function HomePage() {
  const [products, risers, fallers] = await Promise.all([
    getProducts(),
    getTopRisers(6),
    getTopFallers(6),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Product Sections (A: Risers, B: Fallers, C: All Products) */}
      <HomeProductSections
        products={products}
        risers={risers}
        fallers={fallers}
      />
    </div>
  );
}
