FROM node:8-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./package.json /usr/app

RUN apk add --update python make g++
RUN npm install --only=production && npm cache clean --force

COPY ./dist/. /usr/app/dist

ARG PORT=80
ENV PORT ${PORT}

CMD npm run server

EXPOSE $PORT
