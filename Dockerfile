FROM node:14-stretch

ENV NODE_ENV="development"

WORKDIR /app

CMD npm i && npm run dev
