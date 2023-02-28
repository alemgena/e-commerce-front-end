# Use a Node 16 base image
FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /usr/src/app
# Copy app files
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 50050
# Start the app
CMD [ "yarn", "start"]
