FROM node:12-alpine
COPY client/ /app/
COPY mountains.proto /
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node", "index"]
