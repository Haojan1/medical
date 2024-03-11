# Use an official Node.js 18 image as the base image
FROM node:16.15.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json /usr/src/app

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /usr/src/app

# Build the Next.js app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
