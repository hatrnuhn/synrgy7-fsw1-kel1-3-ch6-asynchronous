import express from 'express';
import { getAllInvoice } from '../../controllers/admin/InvoiceController';
export const customerInvoiceRouter = express.Router();

// customerInvoiceRouter.use(authMiddleware);
// customerInvoiceRouter.use(CheckRole.isCustomer);
customerInvoiceRouter.get('/', getAllInvoice);