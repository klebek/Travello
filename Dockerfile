# base image
FROM node:10.15 as builder
# The qq is for silent output in the console
# Copies all the content
COPY / /app
WORKDIR /app
# Install all the packages
RUN npm install
CMD $(npm bin)/ng build

EXPOSE 4200


#S2

#FROM nginx

#COPY --from=builder /app/dist/* /usr/share/nginx/html

#EXPOSE 80
