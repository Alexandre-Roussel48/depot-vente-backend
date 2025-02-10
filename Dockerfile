FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

RUN npx prisma generate

EXPOSE 5000

CMD ["node", "app.js"]
