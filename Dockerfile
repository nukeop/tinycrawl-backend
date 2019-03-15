FROM node:8-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./package.json /usr/app
COPY ./server/. /usr/app/server
COPY ./webpack.config.js /usr/app
COPY ./.babelrc /usr/app

RUN apk add --update python make g++
RUN npm install && npm cache clean --force
RUN npm run build

ENV PORT 80
CMD npm run server

EXPOSE 80
