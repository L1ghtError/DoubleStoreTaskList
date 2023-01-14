FROM node:alpine AS build
WORKDIR /app-data-base
COPY . .
RUN apk add curl
RUN npm install -g json-server
# CMD json-server db.json --host 0.0.0.0 --port 3000
#docker build -t json-servak .
#docker run -p 3000:3001 json-servak
