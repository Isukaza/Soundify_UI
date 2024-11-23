FROM node:20.9.0 AS build

WORKDIR /usr/app

COPY . /usr/app

RUN npm ci

RUN npm run build

FROM nginx:1.27-alpine

EXPOSE 80

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/app/dist /usr/share/nginx/html