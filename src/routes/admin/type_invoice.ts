import express from 'express';
import { getAllTypeInvoice, getTypeInvoiceById, createTypeInvoice, updateTypeInvoice, deleteTypeInvoice } from '../../controllers/admin/TypeInvoiceController';
export const typeInvoiceRouter = express.Router();

typeInvoiceRouter.get('/', getAllTypeInvoice);
typeInvoiceRouter.get('/:id', getTypeInvoiceById);
typeInvoiceRouter.post('/', createTypeInvoice);
typeInvoiceRouter.put('/:id', updateTypeInvoice);
typeInvoiceRouter.delete('/:id', deleteTypeInvoice);