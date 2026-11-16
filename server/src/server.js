const PROTO_PATH = "./mountains.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var mountainsProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const mountains = [
    {
        id: "a48a6488-fba6-11ea-adc1-0242ac120002",
        name: "Mt. Washington",
        elevation: 1917,
        location: "44_16_13.8_N_71_18_11.7_W"
    },
    {
        id: "a48a8cce-fba6-11ea-adc1-0242ac120002",
        name: "Flatirons",
        elevation: 2484,
        location: "39.988_N_105.293_W"
    }
];

server.addService(mountainsProto.MountainService.service, {
    getAll: (_, callback) => {
        callback(null, { mountains });
    },

    get: (call, callback) => {
        let mountain = mountains.find(n => n.id == call.request.id);

        if (mountain) {
            callback(null, mountain);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    insert: (call, callback) => {
        let mountain = call.request;
        
        mountain.id = uuidv4();
        mountains.push(mountain);
        callback(null, mountain);
    },

    update: (call, callback) => {
        let existingMountain = mountains.find(n => n.id == call.request.id);

        if (existingMountain) {
            existingMountain.name = call.request.name;
            existingMountain.elevation = call.request.elevation;
            existingMountain.location = call.request.location;
            callback(null, existingMountain);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    remove: (call, callback) => {
        let existingMountainIndex = mountains.findIndex(
            n => n.id == call.request.id
        );

        if (existingMountainIndex != -1) {
            mountains.splice(existingMountainIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

// bindAsync, not bind. @grpc/grpc-js has no synchronous bind: the port is opened on a
// callback, and binding errors arrive there rather than as a thrown exception. Logging
// "running" before the bind succeeded is how a container reports healthy while refusing
// connections, so the message moved inside the callback.
//
// server.start() is gone too. It was required by the old native `grpc` package; in
// grpc-js the server is serving as soon as bindAsync calls back, and calling start() is
// deprecated and does nothing.
server.bindAsync(
    "0.0.0.0:8321",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error("Failed to bind 0.0.0.0:8321:", err.message);
            process.exit(1);
        }
        console.log("Server running at 0.0.0.0:%d", port);
    }
);
