# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ENV PORT=4000

# Expose the port your app will run on (assuming your Express app runs on port 3000)
EXPOSE 4000

# Define the command to run your application
CMD [ "npm", "run", "dev" ]
