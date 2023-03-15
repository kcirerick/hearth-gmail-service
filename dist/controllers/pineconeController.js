"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pineconeDB_1 = __importDefault(require("../dbconfig/pineconeDB"));
const API_KEY = process.env.PINECONE_API_KEY;
const ENVIRONMENT = "us-east-1-aws";
class PineconeController {
    async get(req, res, next) {
        if (typeof API_KEY !== 'undefined') {
            await pineconeDB_1.default.init({
                environment: ENVIRONMENT,
                apiKey: API_KEY
            });
        }
        else {
            res.send("Missing API KEY");
        }
        const indexName = "first-index";
        const indexes = await pineconeDB_1.default.listIndexes();
        if (indexes.includes(indexName)) {
            await pineconeDB_1.default.deleteIndex({ indexName: indexName });
        }
        await pineconeDB_1.default.createIndex({
            createRequest: {
                name: indexName,
                dimension: 3,
                metric: "cosine"
            }
        });
        const Index = pineconeDB_1.default.Index("first-index");
        const upsertRequest = {
            vectors: [
                {
                    id: "vec1",
                    vector: [0.1, 0.2, 0.3],
                    metadata: {
                        genre: "drama",
                    },
                }
            ],
            namespace: "example-namespace"
        };
        const upsertResponse = await Index.upsert({ upsertRequest });
        res.send(upsertResponse);
    }
}
exports.default = PineconeController;
//# sourceMappingURL=pineconeController.js.map