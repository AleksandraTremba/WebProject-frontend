FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
