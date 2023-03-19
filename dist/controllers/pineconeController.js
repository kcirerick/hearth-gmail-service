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
        /* const indexes = await pinecone.listIndexes();
        if (indexes.includes(indexName)) {
          await pinecone.deleteIndex({ indexName: indexName });
          console.log("Deleting index...");
          await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for index to get deleted.
          console.log("Deleted");
        }
    
        await pinecone.createIndex({
          createRequest: {
            name: indexName,
            dimension: 3,
            metric: "cosine"
          }
        });
        console.log("Creating new index");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for index to get deleted.
        console.log("Index created"); */
        const Index = pineconeDB_1.default.Index(indexName);
        const upsertRequest = {
            "vectors": [
                {
                    id: "vec1",
                    values: [1, 2, 3],
                }
            ]
        };
        const upsertResponse = await Index.upsert({ upsertRequest });
        res.send(upsertResponse);
        //res.send('deleted and created index');
    }
}
exports.default = PineconeController;
//# sourceMappingURL=pineconeController.js.map