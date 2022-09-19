FROM node:16-alpine as development

EXPOSE 8080

WORKDIR /be/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /be/src/app

COPY package*.json .

COPY .env .

RUN npm ci --only=production

COPY --from=development /be/src/app/build ./build/

CMD ["node", "build/index.js"]

 