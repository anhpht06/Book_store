# FROM node:22-alpine as BASE

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci --frozen-lockfile && npm cache clean --force

# #build Image
# FROM node:22-alpine as BUILD

# WORKDIR /app

# COPY --from=BASE /app/node_modules ./node_modules
# COPY . .

# RUN npm run build && \
#     npm ci --production && \
#     npm cache clean --force 
    

# #production Image
# FROM node:22-alpine as PRODUCTION

# WORKDIR /app

# COPY  --from=BUILD /app/package*.json ./
# COPY  --from=BUILD /app/node_modules ./node_modules
# COPY  --from=BUILD /app/.next ./.next
# COPY  --from=BUILD /app/public ./public

# EXPOSE 3000

# CMD ["node_modules/.bin/next", "start"]

# Base Image

FROM node:22-alpine as BASE

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

# Build Stage
FROM node:22-alpine as BUILD

WORKDIR /app

COPY --from=BASE /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production Image
FROM node:22-alpine as PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]



