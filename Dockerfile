FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
VOLUME ["/usr/src/app/data", "/usr/src/app/public"]
CMD ["npm", "start"]