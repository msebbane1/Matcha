FROM node:20.9.0

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn cache clean --force

RUN yarn global add @angular/cli@latest

RUN yarn add @angular-devkit/build-angular --dev


EXPOSE 3000

CMD ["yarn", "start"]