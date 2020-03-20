# based on https://mherman.org/blog/dockerizing-an-angular-app/
# base image
FROM node:12.4.0-slim as install

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json

RUN npm install

FROM node:12.4.0-slim as build

WORKDIR /usr/src/app
COPY --from=install /usr/src/app/node_modules ./node_modules/
COPY . /usr/src/app

EXPOSE 4205

CMD npm run start:prod