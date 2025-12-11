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
import { SplitToggleSection } from "@/components/ui/split-toggle-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="bg-gray-50 flex-1 pt-24">
      {/* Hero Section */}
      <div className="bg-[#0d4d4d] flex items-center justify-center p-6 lg:p-20">
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
                  <span className="text-xl">🇫🇷</span>
                  <span className="text-[#0d4d4d] font-medium text-sm">
                    Plateforme RH Française
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-[#0d4d4d] mb-2">
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Meilleurs RH.
                  </div>
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    Meilleures équipes.
                  </div>
                </h1>
              </div>

              {/* Bottom Section with Description - Overlays the background */}
              <div className="relative z-10 mt-12">
                <p className="text-white text-lg lg:text-xl leading-relaxed mb-6 mt-16">
                  Nous connectons les <span className="font-bold">chercheurs d'emploi</span> avec
                  les meilleures opportunités et aidons les{" "}
                  <span className="font-bold">recruteurs</span> à trouver les talents
                  parfaits pour leurs équipes.
                </p>

                {/* CTA Button */}
                <button className="bg-[#ffd700] hover:bg-[#ffed4e] text-black px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg text-lg">
                  Commencer maintenant
                </button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="bg-[#6b7c6e] relative min-h-[500px] lg:min-h-full overflow-hidden">
              <img
                src="/images/hero-professional.webp"
                alt="Professional HR Consultant"
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
                      Optimisez votre CV et préparez-vous efficacement pour
                      vos entretiens d'embauche avec nos experts RH.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#c9d5c0] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Target className="w-5 h-5" />
                      Coaching carrière
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Bénéficiez d'un accompagnement personnalisé pour
                      atteindre vos objectifs professionnels.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <Button className="bg-[#0d4d4d] hover:bg-[#0d4d4d]/90 text-white flex-1">
                  Créer mon profil
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#0d4d4d] text-[#0d4d4d] hover:bg-[#c9d5c0]"
                >
                  Voir les offres
                </Button>
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
                      Accès aux meilleurs talents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Trouvez rapidement les candidats qualifiés grâce à notre
                      réseau de professionnels RH vérifiés.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ffd700] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Target className="w-5 h-5" />
                      Recrutement ciblé
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Publiez vos offres et accédez à un vivier de talents
                      qualifiés qui correspondent à vos critères.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ffd700] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-[#0d4d4d]">
                      <Briefcase className="w-5 h-5" />
                      Consultation RH
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Bénéficiez de conseils d'experts pour optimiser votre
                      stratégie RH et résoudre vos problématiques.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <Button className="bg-[#ffd700] hover:bg-[#ffed4e] text-[#0d4d4d] font-semibold flex-1">
                  Publier une offre
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#0d4d4d] text-[#0d4d4d] hover:bg-[#ffd700]/20"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          }
          className="min-h-[700px] lg:min-h-[800px]"
        />
      </section>

      {/* Features Section with animated cards */}
      <section className="py-20 px-6 lg:px-12 bg-[#0d4d4d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Une plateforme complète pour
              <br />
              vos besoins RH
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Matching Card */}
            <div className="group relative bg-[#d4e8d4] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                  <div className="w-full h-48 flex items-center justify-center">
                    <UserCheck className="w-24 h-24 text-emerald-700/30" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Algorithme intelligent qui met en relation les talents avec
                    les opportunités parfaites
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <h3 className="text-2xl font-bold text-gray-900">Matching</h3>
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Card */}
            <div className="group relative bg-gray-200 rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600 group-hover:pointer-events-none">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Vérification
                  </h3>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <Target className="w-24 h-24 text-gray-700/30" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Validation approfondie des profils RH pour garantir la
                      qualité et l'expertise
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Vérification
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500 group-hover:pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coaching Card */}
            <div className="group relative bg-[#ffd700] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600 group-hover:pointer-events-none">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Coaching
                  </h3>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <Users className="w-24 h-24 text-yellow-700/30" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Accompagnement personnalisé pour booster votre carrière
                      ou vos recrutements
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Coaching
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500 group-hover:pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Suivi Card */}
            <div className="group relative bg-[#d4c5f9] rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600 group-hover:pointer-events-none">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Suivi
                  </h3>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-white/50">
                    <div className="w-full h-48 flex items-center justify-center">
                      <FileText className="w-24 h-24 text-purple-700/30" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Tableau de bord complet pour suivre vos candidatures et
                      recrutements en temps réel
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">Suivi</h3>
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-white transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500 group-hover:pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Communauté Card */}
            <div className="group relative bg-white rounded-3xl overflow-visible hover:shadow-2xl hover:scale-110 hover:z-10 transition-all duration-500">
              <div className="p-8 h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-600 group-hover:pointer-events-none">
                  <h3 className="text-3xl font-bold text-gray-900 writing-mode-vertical transform rotate-180">
                    Communauté
                  </h3>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100">
                    <div className="w-full h-48 flex items-center justify-center">
                      <Briefcase className="w-24 h-24 text-gray-700/30" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Rejoignez un réseau de professionnels RH actifs et
                      échangez sur vos pratiques
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Communauté
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-auto group-hover:opacity-0 opacity-100 transition-opacity duration-500 group-hover:pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors">
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
