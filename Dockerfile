FROM node:14-alpine

WORKDIR /HexOceanForm
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
