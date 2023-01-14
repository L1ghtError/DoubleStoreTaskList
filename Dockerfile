#STEP 1 "vue js"
FROM node:alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
RUN apk add curl
COPY . .
RUN npm run build 
#STEP 2 "Nginx server"
FROM nginx:alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
