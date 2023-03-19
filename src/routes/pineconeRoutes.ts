// Exposes sub-routes of /pinecone/
import express, { Request, Response, NextFunction, Router } from 'express';
import PineconeController from '../controllers/pineconeController';

const pineconeRouter = Router();
const pineconeController = new PineconeController();

pineconeRouter.get('/', pineconeController.get);

export default pineconeRouter;