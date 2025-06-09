# Stage 1 — Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Установим зависимости и соберем проект
RUN npm install
RUN npm run build

# Stage 2 — Run
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Копируем нужные файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
