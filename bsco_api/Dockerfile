FROM node:alpine
RUN apk add --no-cache curl
WORKDIR /usr/local/app
COPY package.json .
RUN npm install
COPY . .
#HEALTHCHECK --retries=3 --interval=10s CMD curl -f http://localhost:5000/api || exit 1
CMD ["node", "src/app.js"]
