# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY next.config.js ./

# COPY pages ./

# Install app dependencies
RUN npm install

# RUN npm run build

# # Adicione esta linha antes do RUN next build
# RUN echo "Debug: Antes do next build"

# # Build the app
# RUN ./node_modules/.bin/next build

# # Adicione esta linha após o RUN next build
# RUN echo "Debug: Após o next build"

# RUN npm install -g next@13.4.9 

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
# ENV NODE_ENV=production

# Build the app
RUN npm run build
# RUN ./node_modules/.bin/next build

# RUN ls -a

# CMD specifies the command to run on container start
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
# CMD ["node",  ".next/standalone/server.js"]

