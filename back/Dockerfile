FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]