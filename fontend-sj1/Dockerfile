FROM node:latest AS build
WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN npm install moment --save
COPY ./ .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
