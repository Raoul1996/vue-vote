FROM node:carbon
MAINTAINER Raoul1996 <Raoul1996@github.com>

# Install env
RUN apt-get update && \
apt-get install -y python \
python-dev \
python-pip \
vim && \
apt-get autoclean && \
rm -rf /var/lib/apt/list/*

# Create app directory
WORKDIR /usr/src/app

# Install nodemon for hot reload
RUN npm i -g nodemon

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If your are building your code for production
# Run npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["nodemon","app.js"]
