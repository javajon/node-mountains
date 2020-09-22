FROM node:12-alpine
COPY client/ /app/
COPY mountains.proto /
WORKDIR /app
RUN npm install
EXPOSE 8321
CMD ["node", "server.js"]
