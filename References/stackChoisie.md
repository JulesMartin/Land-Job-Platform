Front & UX : Next.js 15.3.3/React 18.3.1 tournent en TypeScript 5.8.3  
 pour offrir SSR/ISR, avec Tailwind CSS 3.4.17, DaisyUI, @boxyhq/react-  
 ui et Heroicons pour le design system, tandis que i18next/next-i18next/  
 react-i18next portent l’internationalisation décrite dans “Built With”.

- Backend & données : Prisma 6.9.0/@prisma/client, déclenché via prisma generate/
  db push et un seed ts-node, sert d’ORM vers PostgreSQL, avec docker-compose  
  pour fournir la base locale, Prisma Studio pour l’inspecter et une contrainte  
  d’environnement Node >= 18.x.
- Intégrations métier : Svix 1.67.0 orchestre les webhooks (CRUD équipes), les SDK
  Retraced assurent l’audit log, Stripe 17.7.0 traite paiements et webhook /api/  
  webhooks/stripe, et @boxyhq/metrics + mixpanel-browser collectent la télémétrie,
  comme explicités dans “Built With” et les sections “Svix Webhooks”/“Stripe  
  Payments”.
- Sécurité, observabilité & communication : react-google-recaptcha applique la  
  vérification humaine (section “Recaptcha”), @sentry/nextjs collecte télémétrie  
  d’erreurs (section “Sentry”), et React Email renderer/components + Nodemailer/  
  Slack-notify portent les emails et notifications mentionnés dans la liste de  
  features.
- Tests & outillage : Playwright (script test:e2e, dépendance @playwright/  
  test) couvre l’E2E comme documenté dans “Testing”, Jest 30 + Testing
  Library gèrent l’unitaire, et ESLint/Prettier/Release It/ts-node complètent  
  la chaîne qualité automatisée.
