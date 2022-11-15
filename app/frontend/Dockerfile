FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json .

RUN set -ex \
    && npm install \
    && npm install sequelize pg\
    && postgressql-dev

# RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]