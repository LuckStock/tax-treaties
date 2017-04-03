FROM luckstock/ubuntu-node:7.7.3
MAINTAINER shota@luckstock.com

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# Cache npm dependencies
COPY package.json /app/
RUN npm run build

# Copy application files
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
