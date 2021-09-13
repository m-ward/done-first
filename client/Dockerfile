FROM node:16-alpine3.11
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]