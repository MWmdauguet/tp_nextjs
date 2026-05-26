"use client"; 

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">Produit #{id}</h1>
      <p className="text-gray-500">Détails du produit à venir.</p>
    </div>
  );
}