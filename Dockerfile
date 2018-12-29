# base image
FROM node:10.15
# The qq is for silent output in the console
WORKDIR /app
# Copies all the content
COPY . .
# Install all the packages
RUN npm install

ARG env=prod

RUN npm run build -- --prod --enviroment $env

#S2

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
