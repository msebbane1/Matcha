FROM node:20.12.2

WORKDIR /app

COPY . .

RUN yarn install

#RUN yarn add express

EXPOSE 8080

CMD ["yarn", "start"]