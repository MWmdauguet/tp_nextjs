type Props = { params: { id: string } };

export default function ProductPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">Produit #{params.id}</h1>
      <p className="text-gray-500">Détails du produit à venir.</p>
    </div>
  );
}