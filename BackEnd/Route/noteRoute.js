import express from 'express';
import { addNote, fetchNote } from '../Controller/noteController.js';
import { tokenVerify } from '../Middleware/middleware.js';

export const noteRouter = express.Router();

noteRouter.post("/add", tokenVerify, addNote);
noteRouter.get("/get", tokenVerify, fetchNote);