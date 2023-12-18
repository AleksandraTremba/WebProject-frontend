# Build stage
FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
