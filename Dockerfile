FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./prisma ./prisma

RUN npm run build

EXPOSE 3000

# Command to run your app.
CMD ["npm", "start"]
