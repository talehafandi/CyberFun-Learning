FROM node:20.12.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6006

CMD [ "npm", "start" ]