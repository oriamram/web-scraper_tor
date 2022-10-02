FROM node:alpine

WORKDIR /home/server

COPY . .

RUN npm install --only=prod

EXPOSE 4000
EXPOSE 4545

CMD ["npm", "start"]