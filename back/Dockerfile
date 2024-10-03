FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]