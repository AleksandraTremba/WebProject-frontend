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

COPY --from=build /app/dist /usr/share/nginx/html/
COPY /docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
