FROM node:10.16-alpine

RUN mkdir -p /app/src
WORKDIR /app

ADD . /app
ADD package.json /app/package.json

RUN npm ci

CMD ["npm", "run", "start"]
