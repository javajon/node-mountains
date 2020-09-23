const PROTO_PATH = "../mountains.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const MountainService = grpc.loadPackageDefinition(packageDefinition).MountainService;
const client = new MountainService(
	"localhost:8321",
	grpc.credentials.createInsecure()
);

module.exports = client;
