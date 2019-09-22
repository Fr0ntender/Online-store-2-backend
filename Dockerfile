FROM node:12.10.0-alpine

RUN apk add git \
    && cd home/ \
    && git clone https://github.com/Frost0x/Online-store_Phase2_server.git \
    && cd Online-store_Phase2_server \
    && npm i -g nodemon \
    && yarn

WORKDIR /home/Online-store_Phase2_server

EXPOSE 8081

CMD ["nodemon", "src/index.js"]
