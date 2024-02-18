# Use an official AWS Lambda runtime as a parent image
FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory in the container
WORKDIR /var/task

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install python3 - dependency for bcrypto package
RUN dnf install gcc-c++ make python3 -y

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /var/task
COPY . .

# Command that will be executed when the container starts
CMD [ "index.handler" ]
