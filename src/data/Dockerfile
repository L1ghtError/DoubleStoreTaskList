FROM node:alpine AS build
WORKDIR /app-data-base
COPY . .
RUN npm install -g json-server
EXPOSE 3000
CMD [ "json-server","db.json","--port 3000"]

