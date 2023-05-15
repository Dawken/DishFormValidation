FROM node:16.15.1-alpine

WORKDIR /HexOceanForm
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
