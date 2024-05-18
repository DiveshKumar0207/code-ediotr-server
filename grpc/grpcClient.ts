import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";



const PROTO_PATH = path.join(__dirname, "editor.proto") ;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    arrays: true,
    oneofs: true,
});


const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition) as {api: any};

const cCodeClient =  new protoDescriptor.CCode(
    "your.grpc.server.address:port",
    grpc.credentials.createInsecure()
)

const rustCodeClient =  new protoDescriptor.RustCode(
    "16.16.207.73",
    grpc.credentials.createInsecure()
)

const cppCodeClient =  new protoDescriptor.CcpCode(
    "your.grpc.server.address:port",
    grpc.credentials.createInsecure()
)


export {cCodeClient, rustCodeClient, cppCodeClient};
