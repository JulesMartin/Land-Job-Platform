'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Link from 'next/link';

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

export default function CreateRHProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Vous devez être connecté pour créer un profil RH');
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSubmit = async (values: {
    bio: string;
    expertise: string[];
    priceRange: string;
    calendlyLink: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/rh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user?.id,
          bio: values.bio,
          expertise: values.expertise,
          priceRange: values.priceRange,
          calendlyLink: values.calendlyLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Erreur lors de la création du profil RH');
        return;
      }

      toast.success(
        'Profil RH créé avec succès ! En attente de validation par un administrateur.'
      );
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Devenir professionnel RH
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre profil pour rejoindre notre réseau de professionnels RH
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <Formik
            initialValues={{
              bio: '',
              expertise: [],
              priceRange: '',
              calendlyLink: '',
            }}
            validationSchema={RHProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                {/* Info message */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Votre profil sera soumis à validation par un
                        administrateur avant d'être visible publiquement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-4">
                  <Link
                    href="/"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Création...' : 'Créer mon profil RH'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
