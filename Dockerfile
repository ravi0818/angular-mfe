FROM node:20-alpine

WORKDIR /app/angular-mfe

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 4200

EXPOSE 4201

RUN npm run build:common

RUN npm run build:todos-app

CMD ["npm", "run", "start-prod:host-app"]
