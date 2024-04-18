FROM node:20.12.2

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 4200

CMD ["ng", "serve", "host", "0.0.0.0"]