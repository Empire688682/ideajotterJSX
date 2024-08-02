import express from 'express';
import { addNote } from '../Controller/noteController.js';
import { tokenVerify } from '../Middleware/middleware.js';

export const noteRouter = express.Router();

noteRouter.post("/add", tokenVerify, addNote);