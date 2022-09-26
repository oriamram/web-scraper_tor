FROM node

WORKDIR /home/server

COPY . .

RUN npm install

EXPOSE 4000
EXPOSE 4545

CMD ["npm", "start"]