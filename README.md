# Prospection Agent GEM

Ce projet est un dashboard moderne pour la gestion de campagnes de prospection, l’envoi de messages, et le suivi des conversations. Il propose une expérience UX/UI avancée : transitions animées, micro-interactions, avatars, statistiques, recherche en temps réel, et intégration API n8n.

## Fonctionnalités principales
- Gestion des campagnes d’envoi de messages
- Recherche de prospects intelligente (API n8n)
- Inbox pour suivre et répondre aux conversations
- Statistiques visuelles (chart.js)
- Avatars générés automatiquement
- Micro-interactions et animations (framer-motion, Tailwind)
- Mode sombre avec toggle
- Loader/skeleton pour les listes

## Technologies utilisées
- Next.js 15 (App Router)
- React
- Jotai (state management)
- Tailwind CSS
- framer-motion
- chart.js, react-chartjs-2
- Lucide-react (icônes)
- sonner (notifications)
- n8n (API externe)

## Installation

1. **Cloner le projet**
	```bash
	git clone <url-du-repo>
	cd prospection_agent_gem
	```

2. **Installer les dépendances**
	```bash
	npm install
	```

3. **Lancer le serveur de développement**
	```bash
	npm run dev
	```

4. **Accéder à l’application**
	Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Configuration API n8n
- Modifie l’URL du webhook n8n dans `ProspectSearchForm.tsx` si besoin.
- Assure-toi que le workflow n8n est actif et accessible.

## Personnalisation
- Les couleurs, avatars, et animations sont configurables dans les fichiers `components/` et `lib/`.
- Le mode sombre est activable via le bouton dans le header.

## Dépendances principales
- next
- react
- jotai
- tailwindcss
- framer-motion
- chart.js
- react-chartjs-2
- lucide-react
- sonner

## Contribution
Les PR et suggestions sont les bienvenues !

## Licence
MIT
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
