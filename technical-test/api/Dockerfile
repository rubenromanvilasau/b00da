FROM node:18-alpine as base

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 4000
EXPOSE 4000

# Run app
CMD node app.js