import Image from "next/image";

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const data = await response.json();
  return data.products ?? [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Products</h1>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="relative h-44 w-full">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="line-clamp-1 text-lg font-medium">{product.title}</h2>
                <p className="whitespace-nowrap text-base font-semibold text-emerald-700">
                  ${product.price}
                </p>
              </div>

              <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Rating: {product.rating}</span>
                <span>Stock: {product.stock}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}