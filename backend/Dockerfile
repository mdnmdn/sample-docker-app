FROM node:14.5-alpine

# add curl for 
RUN apk --no-cache add curl

COPY package*.json /

RUN npm ci --production

#COPY (?!(node_modules|\.)) /
COPY . /app

WORKDIR /app

USER node

ENV TEMP_FILE_PATH /tmp
ENV MONGODB ''

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/ || exit 1

CMD ["node","server.js"]

# docker build . -t sample-app:v1-backend
# docker build . -t mdnmdn/sample-app:v1-backend
# docker push mdnmdn/sample-app:v1-backend
