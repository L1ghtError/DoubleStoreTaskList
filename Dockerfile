#STEP 1 "vue js"
FROM node:alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build 
#STEP 2 "json-server"
RUN npm install -g json-server
COPY ./src/data/db.json /app
CMD [ "json-server","db.json","--port 3000"]
#STEP 3 "Nginx server"
FROM nginx:alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"] 
