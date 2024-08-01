# stage 1
FROM node:22-alpine AS BASE 
 
WORKDIR /app 
 
COPY package*.json ./ 
 
RUN npm ci --frozen-lockfile && npm cache clean --force
 
# stage 2
FROM node:22-alpine AS BUILD
 
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
 
# stage 3

FROM node:22-alpine AS PRODUCTION

WORKDIR /app

COPY  --from=BUILD /app/package*.json ./
COPY  --from=BUILD /app/node_modules ./node_modules
COPY  --from=BUILD /app/build ./build

EXPOSE 3333
CMD ["node", "build/bin/server.js"]
