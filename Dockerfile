FROM node

WORKDIR /src/api_sales

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY .env ./.env

RUN npm install

EXPOSE 5000

CMD ["npm start"]