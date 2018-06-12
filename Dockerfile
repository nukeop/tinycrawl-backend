FROM node:8.11.2-onbuild

ARG PORT=80
ENV PORT ${PORT}

WORKDIR /usr/src/app
COPY ./server/. /usr/src/app/server
COPY ./.babelrc /usr/src/app
COPY ./webpack.* /usr/src/app

CMD npm start

EXPOSE $PORT