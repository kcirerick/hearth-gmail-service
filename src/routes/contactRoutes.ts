// Exposes sub-routes of /contacts/
import express, { Router } from 'express';
import ContactsController from '../controllers/contactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.get('/', contactsController.get);

export default contactsRouter;