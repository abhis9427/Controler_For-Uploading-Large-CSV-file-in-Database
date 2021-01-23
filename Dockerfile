FROM node:9-slim

WORKDIR /atlanApp
 
COPY package.jason /atlanApp
 
RUN npm install

COPY . /atlanApp
 
CMD ["npm","start"]
