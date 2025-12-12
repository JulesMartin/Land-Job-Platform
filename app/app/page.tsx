"use client";

import {
  ArrowUpRight,
  Briefcase,
  UserCheck,
  Search,
  FileText,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { SplitToggleSection } from "@/components/ui/split-toggle-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="bg-gray-50 flex-1">
      {/* Hero Section */}
      <div className="bg-[#0d4d4d] flex items-center justify-center py-12 lg:py-30 px-6">
        <div className="w-full max-w-[100rem]">
          {/* Hero Card */}
          <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left Section - Content */}
            <div className="relative p-12 lg:p-16 flex flex-col overflow-hidden">
              {/* Background - Two colors */}
              <div className="absolute inset-0">
                <div className="p-50 bg-[#c9d5c0]"></div>
                <div className="p-100 bg-[#0a3d3d]"></div>
              </div>

              {/* Content overlay */}
              <div className="relative z-10 flex-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                  <span className="text-xl">🍁</span>
                  <span className="text-[#0d4d4d] font-medium text-sm">
                    Plateforme RH en France
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-[#0d4d4d] mb-2">
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Better HR.
                  </div>
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Brighter Futures.
                  </div>
                </h1>
              </div>

              {/* Bottom Section with Description - Overlays the background */}
              <div className="relative z-10 mt-12">
                <p className="text-white text-lg lg:text-xl leading-relaxed mb-6 mt-16">
                  Nous aidons les <span className="font-bold">entreprises</span>{" "}
                  à trouver les talents RH dont elles ont besoin et les{" "}
                  <span className="font-bold">professionnels RH</span> à
                  développer leur carrière.
                </p>

                {/* CTA Button */}
                <Link href="/rh">
                  <button className="bg-[#ffd700] hover:bg-[#ffed4e] text-black px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg text-lg">
                    Découvrir les profils RH
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="bg-[#6b7c6e] relative min-h-[500px] lg:min-h-full overflow-hidden">
              <img
                src="/images/imageFemme.webp"
                alt="Professionnelle RH"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Split Toggle Section */}
      <section className="py-20 bg-white">
        <div className="text-center mb-12 px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d4d4d] mb-4">
            Qui êtes-vous ?
          </h2>
          <p className="text-lg text-gray-600">
            Sélectionnez votre profil pour découvrir nos services personnalisés
          </p>
        </div>

        <SplitToggleSection
          leftContent={
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#c9d5c0] rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-[#0d4d4d]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0d4d4d]">
                Je cherche un emploi
              </h3>
              <p className="text-gray-600">
                Trouvez votre prochaine opportunité professionnelle
              </p>
            </div>
          }
          rightContent={
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#ffd700] rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[#0d4d4d]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0d4d4d]">
                Je suis un recruteur
              </h3>
              <p className="text-gray-600">
                Trouvez les meilleurs talents pour votre entreprise
              </p>
            </div>
          }
          expandedLeftContent={
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#0d4d4d]">
                  Chercheurs d'emploi
                </h2>
                <div className="w-16 h-16 bg-[#c9d5c0] rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#0d4d4d]" />
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Nous vous accompagnons dans votre recherche d'emploi et votre
                développement professionnel.
              </p>

              <div className="grid gap-3">
                <Card className="border-2 border-[#c9d5c0] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Briefcase className="w-5 h-5" />
                      Recherche d'emploi personnalisée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Accédez à des opportunités exclusives dans votre domaine.
                      Nous vous mettons en relation avec des employeurs qui
                      correspondent à votre profil.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#c9d5c0] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <FileText className="w-5 h-5" />
                      Préparation de CV et entretiens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Optimisez votre CV et préparez-vous efficacement pour vos
                      entretiens d'embauche.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#c9d5c0] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Target className="w-5 h-5" />
                      Accompagnement carrière
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Développez vos compétences et accélérez votre évolution
                      professionnelle avec nos experts RH.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <Link href="/auth/join" className="flex-1">
                  <Button className="bg-[#0d4d4d] hover:bg-[#0d4d4d]/90 text-white w-full">
                    Créer mon profil
                  </Button>
                </Link>
                <Link href="/rh" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-[#0d4d4d] text-[#0d4d4d] hover:bg-[#c9d5c0]"
                  >
                    Voir les offres
                  </Button>
                </Link>
              </div>
            </div>
          }
          expandedRightContent={
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#0d4d4d]">
                  Recruteurs
                </h2>
                <div className="w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#0d4d4d]" />
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Simplifiez votre processus de recrutement et trouvez les talents
                dont vous avez besoin pour développer votre entreprise.
              </p>

              <div className="grid gap-3">
                <Card className="border-2 border-[#ffd700] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <UserCheck className="w-5 h-5" />
                      Recrutement efficace
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Automatisez vos processus de recrutement et embauchez
                      rapidement grâce à notre plateforme optimisée.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ffd700] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Target className="w-5 h-5" />
                      Sourcing de talents qualifiés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Accédez à un vivier de talents qualifiés. Nous gérons tout
                      le processus de sélection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ffd700] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Briefcase className="w-5 h-5" />
                      Consultation RH personnalisée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Bénéficiez de conseils d'experts pour optimiser votre
                      stratégie RH et résoudre vos problématiques complexes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <Link href="/rh/create" className="flex-1">
                  <Button className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#0d4d4d] font-semibold w-full">
                    Publier une offre
                  </Button>
                </Link>
                <Link href="/rh" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-[#0d4d4d] text-[#0d4d4d] hover:bg-[#ffd700]/20"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          }
          className="min-h-[700px] lg:min-h-[800px]"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-[#0d4d4d]">
        <div className="max-w-[100rem] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Une plateforme complète pour
              <br />
              tous vos besoins RH
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Scale Card */}
            <div className="group relative bg-[#d4e8d4] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                {/* Image Section */}
                <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                  <div className="w-full h-48 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-emerald-700/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Gérez facilement vos recrutements avec des processus
                    automatisés et efficaces
                  </p>
                </div>

                {/* Title and Arrow */}
                <div className="flex items-center justify-between mt-auto">
                  <h3 className="text-2xl font-bold text-gray-900">Gestion</h3>
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Customize Card */}
            <div className="group relative bg-gray-200 rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                {/* Vertical Text */}
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Personnalisation
                  </h3>
                </div>

                {/* Expanded Content */}
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-gray-700/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Adaptez chaque aspect de votre processus de recrutement à
                      vos besoins uniques
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Personnalisation
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sourcing Card */}
            <div className="group relative bg-[#ffd700] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Sourcing
                  </h3>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-yellow-700/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Trouvez les meilleurs candidats rapidement avec nos outils
                      de sourcing puissants
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Sourcing
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Card */}
            <div className="group relative bg-[#d4c5f9] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Économies
                  </h3>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-purple-700/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Réduisez vos coûts et gagnez du temps avec des processus
                      optimisés
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Économies
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Automations Card */}
            <div className="group relative bg-white rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Automatisation
                  </h3>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100">
                    <div className="w-full h-48 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-gray-700/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Automatisez vos tâches répétitives et concentrez-vous sur
                      l'essentiel
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Automatisation
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
