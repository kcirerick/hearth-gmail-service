import express, { Request, Response, NextFunction } from 'express';
import pinecone from '../dbconfig/pineconeDB';

const API_KEY = process.env.PINECONE_API_KEY;
const ENVIRONMENT = "us-east-1-aws";

class PineconeController {

  public async get(req: Request, res: Response, next: NextFunction) {
    if (typeof API_KEY !== 'undefined') {
      await pinecone.init({
        environment: ENVIRONMENT,
        apiKey: API_KEY
      });
    } else {
      res.send("Missing API KEY");
    }

    const indexName = "first-index";
    const indexes = await pinecone.listIndexes();
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
    console.log("Index created");

    const Index = pinecone.Index(indexName);

    const upsertRequest: any = {
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

export default PineconeController;