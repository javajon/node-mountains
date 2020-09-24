# Exploring Node.js Microservice application with gRPC

This project is separated into two parts:

- Server: where gRPC serves the remote calls defined in the proto file
- Client: Express/Node/Bootstrap web page to CRUD the server operations.

To run this app locally, run the following commands in separate command line windows:

- Inside the /client folder: `node index`
- Inside the /root folder: `npm start`

Go to http://localhost:3000/ and try the _Mountains_ application.

## Running on Kubernetes

This project includes Dockerfiles to package the client and server into container images. In turn, there is a Katacoda scenario called [Node.js to Kubernetes](https://katacoda.com/javajon/courses/kubernetes-containers) that shows how this application runs on Kubernetes.

## References

This tutorial was adapted from [LogRocket's article](https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/).
