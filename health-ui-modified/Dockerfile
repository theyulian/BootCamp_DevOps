FROM node:10-slim
RUN apt-get update && apt-get install curl -y --no-install-recommends && apt-get clean

COPY site/ /usr/src/app

WORKDIR /usr/src/app

RUN npm install -s --only=production

EXPOSE 8080

ENTRYPOINT npm start
