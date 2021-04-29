FROM node:14-stretch

ENV NODE_ENV="development"

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

CMD npm i && npm run dev
