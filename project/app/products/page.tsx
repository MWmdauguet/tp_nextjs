import Link from 'next/link';

const products = [
  { id: 1, name: 'Casque Audio Pro', price: 129, category: 'electronique', badge: 'Nouveau' },
  { id: 2, name: 'T-shirt Coton Bio', price: 34, category: 'vetements', badge: null },
  { id: 3, name: 'Lampe de Bureau', price: 59, category: 'maison', badge: 'Soldes' },
  { id: 4, name: 'Clavier Mécanique', price: 89, category: 'electronique', badge: null },
  { id: 5, name: 'Veste en Lin', price: 79, category: 'vetements', badge: 'Nouveau' },
  { id: 6, name: 'Carafe en Verre', price: 24, category: 'maison', badge: null },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Produits</h1>
        <p className="text-sm text-gray-500 mt-1">{products.length} produits disponibles</p>
      </div>

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
    </div>
  );
}