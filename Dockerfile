# base image
FROM node:10.15
# The qq is for silent output in the console
# You are welcome to modify this part as it

# Sets the path where the app is going to be installed
ENV NODE_ROOT /usr/app/
# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p $NODE_ROOT
# Sets the /usr/app as the active directory
WORKDIR $NODE_ROOT
# Copies all the content
COPY . .
# Install all the packages
RUN npm install -g @angular/cli

EXPOSE 4200 49153

CMD ng serve
