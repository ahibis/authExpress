FROM node:16.14.2

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV port=3000

EXPOSE $port

cmd ["node","index.js"]