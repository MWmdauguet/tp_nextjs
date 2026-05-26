'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

interface FormData {
  name: string;
  price: string;
  category: string;
  badge?: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError: setFormError } = useForm<FormData>({
    defaultValues: {
      name: '',
      price: '',
      category: 'electronique',
      badge: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name.trim(),
          price: data.price,
          category: data.category,
          badge: data.badge?.trim() || null
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout du produit');
      }

      const result = await response.json();
      console.log('Produit ajouté:', result);
      
      setSuccess(true);
      reset();
      
      setTimeout(() => {
        router.push('/products');
      }, 2000);
    } catch (err) {
      console.error('Erreur:', err);
      setFormError('root', {
        message: err instanceof Error ? err.message : 'Une erreur est survenue'
      });
    }
  };

  const globalError = errors.root?.message;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Retour aux produits
        </Link>
        <h1 className="text-3xl font-medium text-gray-900 mt-4">Ajouter un produit</h1>
        <p className="text-sm text-gray-500 mt-1">Remplissez le formulaire pour ajouter un nouveau produit</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Produit ajouté avec succès!</p>
          <p className="text-green-700 text-sm mt-1">Redirection vers la liste des produits...</p>
        </div>
      )}

      {globalError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Erreur</p>
          <p className="text-red-700 text-sm mt-1">{globalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        
        {/* Nom du produit */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
            Nom du produit *
          </label>
          <input
            type="text"
            id="name"
            disabled={success || isSubmitting}
            placeholder="Ex: Casque Audio Pro"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors disabled:bg-gray-50 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('name', { 
              required: 'Le nom du produit est requis',
              minLength: { value: 1, message: 'Le nom ne peut pas être vide' }
            })}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Prix */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-2">
            Prix (€) *
          </label>
          <input
            type="number"
            id="price"
            disabled={success || isSubmitting}
            placeholder="Ex: 129"
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors disabled:bg-gray-50 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('price', { 
              required: 'Le prix est requis',
              validate: (value) => {
                const num = Number(value);
                return num > 0 ? true : 'Le prix doit être positif';
              }
            })}
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
            Catégorie *
          </label>
          <select
            id="category"
            disabled={success || isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
            {...register('category')}
          >
            <option value="electronique">Électronique</option>
            <option value="vetements">Vêtements</option>
            <option value="maison">Maison</option>
          </select>
        </div>

        {/* Badge */}
        <div>
          <label htmlFor="badge" className="block text-sm font-medium text-gray-900 mb-2">
            Badge (optionnel)
          </label>
          <input
            type="text"
            id="badge"
            disabled={success || isSubmitting}
            placeholder="Ex: Nouveau, Soldes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
            {...register('badge')}
          />
          <p className="text-xs text-gray-500 mt-1">Laissez vide si pas de badge</p>
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting || success}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {isSubmitting ? 'En cours...' : success ? 'Produit ajouté!' : 'Ajouter le produit'}
          </button>
          <Link
            href="/products"
            className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-2.5 rounded-lg transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
