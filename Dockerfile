FROM node:6.1.0

# Update date to rebuild cached image
ENV REFRESHED_AT 2016-05-09

# File Author / Maintainer
MAINTAINER Jeff Deskins


# Logging
RUN npm install -g bunyan

RUN mkdir /src

WORKDIR /src

# Provides cached layer for node_modules
COPY package.json /src/package.json
RUN npm install

COPY . /src

EXPOSE  8080

VOLUME /var/log

# Run app
CMD ["node", "index.js"]
