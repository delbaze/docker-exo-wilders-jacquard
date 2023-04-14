FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY public public
COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY setup.js ./

COPY src src

CMD npm start