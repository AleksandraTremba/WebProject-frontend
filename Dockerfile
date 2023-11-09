FROM node:lts
RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build
RUN npm run start
EXPOSE 8080
CMD ["http-server", "dist"]