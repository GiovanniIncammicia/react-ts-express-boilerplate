FROM node:14-alpine3.12 as builder

# Build Server
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build

# Build Client
WORKDIR /app/client
RUN npm install
RUN npm run build

FROM node:14-alpine3.12 as server

ENV NODE_ENV=production
COPY --from=builder /app/client/build ./build
COPY --from=builder /app/dist ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.docker.env ./.env
RUN npm ci --only=production

EXPOSE 5000

CMD [ "npm", "start" ]
