FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

## Add the wait script to the image
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
# RUN chmod +x /wait

# CMD npm start-server
# The command docker will execute when starting the container, 
# this command is not allowed to exit, if it does your container will stop
CMD npx pm2 start ecosystem.config.js --no-daemon