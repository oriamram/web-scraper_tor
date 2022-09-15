FROM node:13-alpine

RUN mkdir /home/app

COPY . /home/app

CMD ["node","/home/app/server/server.js"]