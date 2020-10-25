FROM node:12.16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --production


COPY public public
COPY src src

RUN npm run build

FROM nginx:1.17.9-alpine

COPY --from=build /app/build/ /var/www/
COPY ./assets/nginx.conf /etc/nginx/nginx.conf

CMD "nginx"

# docker build . -t mdnmdn/sample-app:v1-frontend
# docker push mdnmdn/sample-app:v1-frontend