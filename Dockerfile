# base image
FROM node:10.15 as builder
# The qq is for silent output in the console
# Copies all the content
COPY /src/ /app
WORKDIR /app
# Install all the packages
RUN npm install
RUN $(npm bin)/ng build



#S2

FROM nginx

COPY --from=builder /app/dist/* /usr/share/nginx/html

EXPOSE 80
