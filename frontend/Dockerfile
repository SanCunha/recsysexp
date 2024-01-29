# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY next.config.js ./

RUN npm install -g next@13.4.9

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production


# Build the app
RUN npm run build

# CMD specifies the command to run on container start
CMD ["npm", "start"]

