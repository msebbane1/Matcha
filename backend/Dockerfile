FROM node:20.12.2

WORKDIR /app

COPY . .

RUN yarn install

#RUN yarn add express

EXPOSE 8080


#RUN yarn add sequelize-cli

# Exécution des migrations au démarrage
#CMD ["sh", "-c", "yarn sequelize db:migrate && yarn start"]

CMD ["yarn", "start"]
