


FROM node:10.15 as builder

COPY / /app
WORKDIR /app

RUN npm install

RUN $(npm bin)/ng build

#S2
WORKDIR /app/dist/travello
EXPOSE 80
ENV PORT 80
RUN npm install http-server -g
CMD [ "http-server" ]
