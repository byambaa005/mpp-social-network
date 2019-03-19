FROM node:10.15.3

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 4000

CMD ["npm", "start"]