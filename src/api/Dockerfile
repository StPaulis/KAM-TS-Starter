FROM node:12.4.0-alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

FROM node:12.4.0-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules/
COPY . /usr/src/app

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
