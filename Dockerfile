# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm install
# Generate Prisma client
RUN npm i -g prisma

COPY . .

# Generate Prisma client
RUN npx prisma generate


# Build the application
RUN npm run build

# Start the NestJS application
CMD ["npm", "start"]
