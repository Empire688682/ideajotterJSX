import express from 'express';
import { addNote } from '../Controller/noteController.js';

export const noteRouter = express.Router();

noteRouter.post("/add", addNote)