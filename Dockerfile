# Étape 1: Le "Builder" - Installe les dépendances et construit l'application
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances et les installer
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application Next.js pour la production
RUN npm run build

# Étape 2: Le "Runner" - L'image finale et optimisée
FROM node:20-alpine AS runner
WORKDIR /app

# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copier les dépendances de production
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copier les fichiers de build depuis l'étape "builder"
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public

# Changer le propriétaire du répertoire de travail
USER nextjs

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]