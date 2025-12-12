'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Link from 'next/link';
import PackageManager from '@/components/PackageManager';

const RHProfileSchema = Yup.object().shape({
  bio: Yup.string()
    .min(50, 'La bio doit contenir au moins 50 caractères')
    .max(1000, 'La bio ne doit pas dépasser 1000 caractères')
    .required('La bio est requise'),
  expertise: Yup.array()
    .min(1, 'Sélectionnez au moins une expertise')
    .required('Au moins une expertise est requise'),
  priceRange: Yup.string().required('Le tarif est requis'),
  calendlyLink: Yup.string()
    .url('Lien Calendly invalide')
    .matches(
      /^https?:\/\/(www\.)?calendly\.com\/.+/,
      'Doit être un lien Calendly valide (ex: https://calendly.com/votre-nom)'
    )
    .required('Le lien Calendly est requis'),
});

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

interface DashboardData {
  profile: {
    id: string;
    bio: string | null;
    expertise: string[];
    priceRange: string | null;
    calendlyLink: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  stats: {
    totalConsultations: number;
    totalFavorites: number;
  };
  recentConsultations: Array<{
    id: string;
    timestamp: string;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  }>;
  favoritedBy: Array<{
    id: string;
    createdAt: string;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  }>;
}

export default function RHDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Vous devez être connecté');
      router.push('/auth/login');
    }

    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/dashboard/rh/stats');

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la récupération des données');
      }

      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err: any) {
      console.error('Erreur:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: {
    bio: string;
    expertise: string[];
    priceRange: string;
    calendlyLink: string;
  }) => {
    if (!dashboardData?.profile?.id) return;

    setIsSaving(true);

    try {
      const response = await fetch(`/api/rh/${dashboardData.profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: values.bio,
          expertise: values.expertise,
          priceRange: values.priceRange,
          calendlyLink: values.calendlyLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors de la mise à jour du profil');
        return;
      }

      toast.success('Profil mis à jour avec succès !');
      await fetchDashboardData(); // Rafraîchir les données
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Erreur
            </h2>
            <p className="text-red-600">{error}</p>
            <Link
              href="/rh/create"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Créer un profil RH
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0d4d4d] mb-4">
            Dashboard RH
          </h1>
          <p className="text-lg text-gray-600">
            Gérez votre profil et consultez vos statistiques
          </p>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center px-5 py-3 rounded-2xl font-semibold shadow-lg ${
              dashboardData.profile.isActive
                ? 'bg-gradient-to-r from-[#c9d5c0] to-[#d4e8d4] text-[#0d4d4d] border-2 border-[#c9d5c0]'
                : 'bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#0d4d4d] border-2 border-[#ffd700]'
            }`}
          >
            {dashboardData.profile.isActive
              ? '✓ Profil actif'
              : '⏳ En attente de validation'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Statistiques */}
          <div className="bg-gradient-to-br from-white to-[#c9d5c0]/20 shadow-xl rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-[#0d4d4d] mb-6">
              Statistiques
            </h3>
            <div className="space-y-6">
              <div className="bg-white/60 rounded-xl p-4 border border-[#c9d5c0]/30">
                <div className="text-4xl font-bold text-[#0d4d4d]">
                  {dashboardData.stats.totalConsultations}
                </div>
                <div className="text-sm font-medium text-gray-600">Consultations totales</div>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-[#ffd700]/30">
                <div className="text-4xl font-bold text-[#0d4d4d]">
                  {dashboardData.stats.totalFavorites}
                </div>
                <div className="text-sm font-medium text-gray-600">Ajouté en favoris</div>
              </div>
            </div>
          </div>

          {/* Consultations récentes */}
          <div className="bg-white shadow-xl rounded-2xl p-8 lg:col-span-2 border border-gray-100">
            <h3 className="text-xl font-bold text-[#0d4d4d] mb-6">
              Consultations récentes
            </h3>
            {dashboardData.recentConsultations.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Aucune consultation pour le moment
              </p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {dashboardData.recentConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-[#c9d5c0]/10 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      {consultation.user.image ? (
                        <img
                          src={consultation.user.image}
                          alt={consultation.user.name || 'User'}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {consultation.user.name?.charAt(0) ||
                            consultation.user.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {consultation.user.name || consultation.user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(consultation.timestamp).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Formulaire d'édition */}
        <div className="bg-white shadow-xl rounded-2xl p-8 lg:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-[#0d4d4d] mb-8">
            Modifier mon profil
          </h2>

          <Formik
            initialValues={{
              bio: dashboardData.profile.bio || '',
              expertise: dashboardData.profile.expertise || [],
              priceRange: dashboardData.profile.priceRange || '',
              calendlyLink: dashboardData.profile.calendlyLink || '',
            }}
            validationSchema={RHProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Présentation *
                  </label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    rows={6}
                    className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9d5c0] focus:border-[#0d4d4d] transition-all"
                    placeholder="Décrivez votre parcours, votre expertise et ce que vous proposez..."
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {values.bio.length} / 1000 caractères (minimum 50)
                  </div>
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domaines d'expertise *
                  </label>
                  <div className="space-y-2">
                    {EXPERTISE_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={values.expertise.includes(option.value)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const newExpertise = checked
                              ? [...values.expertise, option.value]
                              : values.expertise.filter(
                                  (v) => v !== option.value
                                );
                            setFieldValue('expertise', newExpertise);
                          }}
                          className="h-4 w-4 text-[#0d4d4d] focus:ring-[#c9d5c0] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="expertise"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label
                    htmlFor="priceRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tarif horaire *
                  </label>
                  <Field
                    as="select"
                    id="priceRange"
                    name="priceRange"
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c9d5c0] focus:border-[#0d4d4d] transition-all"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    {PRICE_RANGES.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="priceRange"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Calendly Link */}
                <div>
                  <label
                    htmlFor="calendlyLink"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Lien Calendly *
                  </label>
                  <Field
                    type="url"
                    id="calendlyLink"
                    name="calendlyLink"
                    className="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9d5c0] focus:border-[#0d4d4d] transition-all"
                    placeholder="https://calendly.com/votre-nom"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Lien vers votre page de réservation Calendly
                  </p>
                  <ErrorMessage
                    name="calendlyLink"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t-2 border-gray-100">
                  <Link
                    href={`/rh/${dashboardData.profile.id}`}
                    className="px-6 py-3 font-medium text-[#0d4d4d] hover:text-gray-900 transition-colors"
                  >
                    Voir mon profil public
                  </Link>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#ffd700] hover:bg-[#ffed4e] text-black px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Gestion des Packages */}
        <div className="bg-white shadow-xl rounded-2xl p-8 lg:p-12 border border-gray-100 mt-8">
          <PackageManager rhProfileId={dashboardData.profile.id} />
        </div>
      </div>
    </div>
  );
}
