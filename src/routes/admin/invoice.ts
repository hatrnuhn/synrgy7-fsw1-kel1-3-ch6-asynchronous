import express from "express";
import {
  getAllInvoice,
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  updateStatus
} from "../../controllers/admin/InvoiceController";
export const invoiceRouter = express.Router();

invoiceRouter.get("/", getAllInvoice);
invoiceRouter.get("/:id", getInvoiceById);
invoiceRouter.post("/", createInvoice);
invoiceRouter.delete("/:id", deleteInvoice);
invoiceRouter.put("/status/:id", updateStatus)
