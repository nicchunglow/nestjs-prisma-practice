# Use an official Node.js runtime as a parent image
FROM node:21-alpine as Build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install app dependencies
RUN npm install
# Generate Prisma client

FROM node:21-alpine
COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Start the NestJS application
CMD ["npm", "start"]
