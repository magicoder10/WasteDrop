FROM node:latest
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]
COPY package*.json ./
RUN npm install
EXPOSE 3000
ARG SECRET
CMD ["npm", "start"]