"use client"; 

import Link from 'next/link';

const navigation = [
  { href: '/', label: 'Accueil' },
  { href: '/products', label: 'Produits' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

const products = [
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/docs', label: 'Documentation' },
  { href: '/changelog', label: 'Changelog' },
];

const legal = [
  { href: '/privacy', label: 'Confidentialité' },
  { href: '/terms', label: "Conditions d'utilisation" },
  { href: '/cookies', label: 'Cookies' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-medium text-gray-900 mb-3">
              MyApp
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Une application moderne construite avec Next.js et Tailwind CSS.
            </p>
            <div className="flex gap-2">
              {['twitter', 'github', 'linkedin'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="sr-only">{s}</span>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Navigation', links: navigation },
            { title: 'Produits', links: products },
            { title: 'Légal', links: legal },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2026 MyApp. Tous droits réservés.</p>
          <p className="text-xs text-gray-400">Fait avec ♥ en France</p>
        </div>
      </div>
    </footer>
  );
}