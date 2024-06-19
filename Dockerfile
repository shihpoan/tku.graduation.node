# Use the official Node.js image as the base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /src

# Copy the package.json and package-lock.json (if available)
COPY package.json .

# Install dependencies
RUN npm install

# app
FROM node:18

# Expose the port the app runs on (change if necessary)
EXPOSE 3001

CMD ["npm", "start"]

WORKDIR /app
COPY --from=builder /src/node_modules /app/node_modules

# Copy the rest of the application code
COPY . .
