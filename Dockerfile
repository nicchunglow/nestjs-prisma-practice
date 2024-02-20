# Use an official Node.js runtime as a parent image
FROM node:21-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npx prisma generate
RUN npm run build

COPY . .

EXPOSE 3000 
# Note: No need to expose the port here since Docker Compose handles it in the docker-compose.yml file

# Start the NestJS application
CMD ["npm", "start"]
