"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  id: string | number;
  name: string;
  price: number;
  badge?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Erreur lors de la récupération des produits');
        }

        const result = await response.json();
        setProducts(result);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">Produits</h1>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? 'Chargement...' : `${products.length} produits disponibles`}
            </p>
          </div>
          <Link
            href="/products/add"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            + Ajouter un produit
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="h-36 bg-gray-100" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-7 bg-gray-100 rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="h-36 bg-gray-50 flex items-center justify-center relative">
                <span className="text-4xl">📦</span>
                {product.badge && (
                  <span className="absolute top-2 right-2 text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-medium">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-500 mt-0.5 mb-3">{product.price} €</p>
                <button className="w-full text-xs py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  Voir plus
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}