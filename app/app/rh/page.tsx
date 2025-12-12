'use client';

import { useState, useEffect } from 'react';
import RHCard from '@/components/RHCard';
import toast from 'react-hot-toast';

type RHProfile = {
  id: string;
  bio: string | null;
  expertise: string[];
  priceRange: string | null;
  calendlyLink: string | null;
  isActive: boolean;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  _count?: {
    consultations: number;
    favorites: number;
  };
};

const EXPERTISE_OPTIONS = [
  { value: 'RECRUITMENT', label: 'Recrutement' },
  { value: 'TALENT_ACQUISITION', label: 'Acquisition de talents' },
  { value: 'HR_CONSULTING', label: 'Conseil RH' },
  { value: 'COACHING', label: 'Coaching' },
  { value: 'TRAINING', label: 'Formation' },
];

const PRICE_RANGES = [
  { value: '0-50', label: '0-50€ / heure' },
  { value: '50-100', label: '50-100€ / heure' },
  { value: '100-150', label: '100-150€ / heure' },
  { value: '150-200', label: '150-200€ / heure' },
  { value: '200+', label: '200€+ / heure' },
];

export default function RHListingPage() {
  const [profiles, setProfiles] = useState<RHProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  // Fonction pour charger les profils RH
  const fetchProfiles = async () => {
    setIsLoading(true);

    try {
      // Construire les paramètres de requête
      const params = new URLSearchParams();

      if (selectedExpertise.length > 0) {
        params.append('expertise', selectedExpertise.join(','));
      }

      if (selectedPriceRange) {
        params.append('priceRange', selectedPriceRange);
      }

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      // Toujours récupérer uniquement les profils actifs
      params.append('isActive', 'true');

      const response = await fetch(`/api/rh?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors du chargement des profils');
        return;
      }

      setProfiles(data.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors du chargement des profils');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les profils au montage et à chaque changement de filtre
  useEffect(() => {
    fetchProfiles();
  }, [selectedExpertise, selectedPriceRange, searchTerm]);

  // Gestion des filtres d'expertise
  const handleExpertiseToggle = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setSelectedExpertise([]);
    setSelectedPriceRange('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d4d4d] to-[#0a3d3d] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trouver un professionnel RH
          </h1>
          <p className="text-lg text-white/90">
            Parcourez notre réseau de professionnels RH et réservez une consultation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec filtres */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0d4d4d]">Filtres</h2>
                {(selectedExpertise.length > 0 ||
                  selectedPriceRange ||
                  searchTerm) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-[#0d4d4d] hover:text-[#ffd700] font-semibold transition-colors"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Recherche par nom */}
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Rechercher par nom
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom du professionnel..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c9d5c0] focus:border-[#0d4d4d] transition-all"
                />
              </div>

              {/* Filtre par expertise */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Domaines d'expertise
                </h3>
                <div className="space-y-2">
                  {EXPERTISE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedExpertise.includes(option.value)}
                        onChange={() => handleExpertiseToggle(option.value)}
                        className="h-4 w-4 text-[#0d4d4d] focus:ring-[#c9d5c0] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtre par prix */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Tarif horaire
                </h3>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c9d5c0] focus:border-[#0d4d4d] transition-all"
                >
                  <option value="">Tous les tarifs</option>
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Listing des profils */}
          <main className="lg:col-span-3">
            {/* Compteur de résultats */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {isLoading ? (
                  'Chargement...'
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">
                      {profiles.length}
                    </span>{' '}
                    professionnel{profiles.length !== 1 ? 's' : ''} RH trouvé
                    {profiles.length !== 1 ? 's' : ''}
                  </>
                )}
              </p>
            </div>

            {/* Grid de profils */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d4d4d]"></div>
                  <p className="mt-4 text-gray-600">
                    Chargement des profils...
                  </p>
                </div>
              </div>
            ) : profiles.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-bold text-[#0d4d4d]">
                  Aucun professionnel trouvé
                </h3>
                <p className="mt-2 text-gray-600">
                  Essayez de modifier vos critères de recherche
                </p>
                {(selectedExpertise.length > 0 ||
                  selectedPriceRange ||
                  searchTerm) && (
                  <button
                    onClick={handleResetFilters}
                    className="mt-6 bg-[#ffd700] hover:bg-[#ffed4e] text-black px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <RHCard key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
