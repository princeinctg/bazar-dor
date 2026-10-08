import { Product, Category } from "@/types";

const PRIMARY_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_BASE_URL =
  process.env.NEXT_PUBLIC_API_FALLBACK_URL || "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${PRIMARY_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Primary API failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`Primary API error for ${endpoint}, falling back...`, error);
    const res = await fetch(`${FALLBACK_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Fallback API failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : `/products`;
  try {
    const products = await fetchWithFallback<Product[]>(endpoint);
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchWithFallback<Category[]>("/categories");
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const category = await fetchWithFallback<Category>(`/categories/${encodeURIComponent(slug)}`);
    return category || null;
  } catch {
    // Fallback Category Fetch to List
    const all = await getCategories();
    return all.find((c) => c.slug === slug || c.id === slug) || null;
  }
}

export async function getProductBySlugOrId(slugOrId: string | number): Promise<Product | null> {
  const isNumeric = /^\d+$/.test(String(slugOrId));

  if (isNumeric) {
    try {
      const product = await fetchWithFallback<Product>(`/products/${slugOrId}`);
      if (product && product.id) return product;
    } catch {
      // Fallback to searching all products
    }
  }

  // Find by slug in all products
  const allProducts = await getProducts();
  const found = allProducts.find(
    (p) => String(p.id) === String(slugOrId) || p.slug === String(slugOrId)
  );

  return found || null;
}

export async function getTopRisers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.change?.dir === "up" && p.change?.pct > 0)
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, limit);
}

export async function getTopFallers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.change?.dir === "down" || (p.change?.pct || 0) < 0)
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, limit);
}
