# Build stage
FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*

COPY docker/nginx/prod.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
