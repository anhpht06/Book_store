FROM node:22-alpine as BASE

WORKDIR /app

COPY package*.json ./

RUN npm ci --frozen-lockfile && npm cache clean --force

#build Image
FROM node:22-alpine as BUILD

WORKDIR /app

COPY --from=BASE /app/node_modules ./node_modules
COPY . .

RUN apk add --no-cache curl \ 
  && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
  && apk del curl

RUN npm run build && \
    rm -rf node_modules && \
    npm ci --production && \
    npm cache clean --force && node-prune
    

#production Image
FROM node:22-alpine as PRODUCTION

WORKDIR /app

COPY  --from=BUILD /app/package*.json ./
COPY  --from=BUILD /app/node_modules ./node_modules
COPY  --from=BUILD /app/.next ./.next
COPY  --from=BUILD /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]




