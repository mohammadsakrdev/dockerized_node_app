FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

## Add the wait script to the image
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
# RUN chmod +x /wait

CMD npm start-server