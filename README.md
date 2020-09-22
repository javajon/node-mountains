# Exploring Node.js server application with gRPC

This project is separated into two parts:

- Server: where gRPC serves the remote calls defined in the proto file
- Client: Express/Node/Bootstrap web page to CRUD the server operations.

To run this app locally, run the following commands in separate command line windows:

- Inside the /client folder: `node index`
- Inside the /root folder: `npm start`

Then, go to http://localhost:3000/ and test it out.

## Running on Kubernetes

This project includes Dockerfiles to package the client and server into container images. In turn, there is a [Katacoda scenario](https://katacoda.com/javajon/courses/kubernetes-containers) that shows how these containers can run on Kubernetes.

## References

This tutorial was adapted from [LogRocket's article](https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/).
