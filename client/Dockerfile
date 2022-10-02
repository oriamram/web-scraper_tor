FROM node:alpine as react-builder

WORKDIR /home/client

COPY . .

RUN npm install

# EXPOSE 3000

RUN npm run build

FROM nginx:alpine
COPY --from=react-builder /home/client/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
