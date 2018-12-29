# base image
FROM node:10.15 as builder
# The qq is for silent output in the console
# Copies all the content
COPY / /app
WORKDIR /app
# Install all the packages
RUN npm install
EXPOSE 4200
RUN $(npm bin)/ng build
CMD $(npm bin)/ng serve --host 0.0.0.0

#S2

#FROM nginx

#COPY --from=builder /app/src/* /usr/share/nginx/html/

#EXPOSE 80
