import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  {
    title: "Talents vérifiés",
    description:
      "Tous les experts RH sont sélectionnés et validés pour garantir un accompagnement fiable.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />, 
  },
  {
    title: "Accompagnement rapide",
    description:
      "Planifiez un premier échange en quelques clics et accélérez vos recrutements.",
    icon: <Sparkles className="h-6 w-6 text-primary" />, 
  },
  {
    title: "Expérience sur-mesure",
    description:
      "Des profils adaptés à vos enjeux : recrutement, marque employeur, onboarding et plus encore.",
    icon: <Users className="h-6 w-6 text-primary" />, 
  },
];

const steps = [
  {
    title: "Expliquez vos besoins",
    description: "Indiquez votre secteur, vos enjeux et le périmètre de la mission RH.",
  },
  {
    title: "Nous sélectionnons les meilleurs profils",
    description: "Accédez à une shortlist d'experts validés et disponibles immédiatement.",
  },
  {
    title: "Démarrez votre collaboration",
    description: "Programmez un rendez-vous et lancez votre mission avec un suivi transparent.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-background p-10 shadow-sm">
        <div className="absolute inset-y-0 right-[-12%] hidden h-full w-1/3 rounded-full bg-primary/10 blur-3xl lg:block" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center relative">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Plateforme dédiée aux talents RH
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
              Accédez aux meilleurs experts RH pour vos recrutements et vos équipes
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              LandJobPlatform connecte les entreprises avec des professionnels RH qualifiés : recruteurs, coachs emploi et spécialistes de la marque employeur.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                Trouver un RH
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Devenir RH partenaire
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["+300 profils vérifiés", "24h pour une mise en relation", "Satisfaction garantie"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="backdrop-blur-sm border-border/80">
            <CardHeader className="border-b border-border/70">
              <CardTitle className="text-xl">Décrivez votre besoin</CardTitle>
              <CardDescription>
                Nous vous mettons en relation avec un expert RH adapté à votre secteur.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission recherchée</Label>
                <Input id="mission" placeholder="Ex: Recrutement tech senior" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Secteur</Label>
                <Input id="sector" placeholder="Ex: SaaS, Banque, Industrie..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <Input id="email" type="email" placeholder="vous@entreprise.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Recevoir une shortlist</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  {benefit.icon}
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </div>
              <CardDescription>{benefit.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border bg-card/60 p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Comment ça marche ?</h2>
            <p className="text-muted-foreground max-w-2xl">
              Notre processus est pensé pour vous faire gagner du temps tout en assurant un accompagnement humain et personnalisé.
            </p>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative rounded-2xl border px-5 py-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Garanties LandJobPlatform
                </CardTitle>
                <CardDescription>Un accompagnement humain, des mises en relation rapides.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Vérification systématique des références et expériences.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Suivi continu durant la mission pour garantir la réussite.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Feedback partagé pour améliorer vos recrutements.</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Des profils RH adaptés</CardTitle>
                <CardDescription>
                  Coachs emploi, responsables recrutement, spécialistes onboarding : trouvez le bon profil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Expertise sectorielle : tech, finance, retail, industrie.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Mission ponctuelle ou accompagnement long terme.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Disponibilité en présentiel ou à distance selon vos besoins.</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  Découvrir les profils
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-primary text-primary-foreground p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 max-w-3xl">
            <h3 className="text-2xl font-semibold">Prêt à rencontrer votre prochain talent RH ?</h3>
            <p className="text-primary-foreground/90">
              Décrivez vos besoins et recevez une shortlist personnalisée sous 24 heures.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="secondary" className="gap-2">
              Commencer maintenant
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-primary text-primary-foreground border-primary-foreground/30 hover:bg-primary/90">
              Parler à un conseiller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
