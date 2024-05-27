import { NextFunction, Request, Response } from "express";
import { InvoiceModel } from "../../database/model/invoice.model";
import { TypeInvoiceModel } from "../../database/model/type_invoice.model";

export const getAllInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await InvoiceModel.query().withGraphFetched("type_invoice").withGraphFetched("user");
    if (invoices) {
      res.status(200).json({ status: "Success", message: "Get all invoice successfully", data: invoices });
    } else {
      res.status(404).json({ status: "Not Found", message: "Failed to Get all invoice", data: invoices });
    }
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const invoice = await InvoiceModel.query().findById(id).withGraphFetched("type_invoice").withGraphFetched("user");
    if (invoice) {
      res.status(200).json({ status: "Success", message: `Get invoice with id ${id} successfully`, data: invoice });
    } else {
      res.status(404).json({ status: "Not Found", message: `Invoice with id ${id} not found`, data: invoice });
    }
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, type_invoice_id, status, quantity } = req.body;

    const getTypeInvoiceById = await TypeInvoiceModel.query().findById(type_invoice_id);

    if (getTypeInvoiceById) {
      const typeInvoice = await InvoiceModel.query().insert({
        user_id,
        type_invoice_id,
        status,
        quantity,
        total_amount: getTypeInvoiceById.price * quantity,
      });
      if (typeInvoice) {
        res.status(200).json({ status: "Success", message: `Create new invoice successfully` });
      } else {
        res.status(400).json({ status: "Failed", message: `Failed to create new invoice` });
      }
    } else {
      res.status(404).json({ status: "Not Found", message: `Type invoice with id ${type_invoice_id} not found` });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const invoice = await InvoiceModel.query().deleteById(id);
    if (invoice) {
      res.status(200).json({ status: "Success", message: `Delete invoice id ${id} successfully` });
    } else {
      res.status(404).json({ status: "Not Found", message: `Invoice not found` });
    }
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const invoice = await InvoiceModel.query().findById(id).update({status: "paid"})
        if(invoice) {
            res.status(200).json({ status: "Success", message: `Update status invoice with id ${id} successfully` });
          } else {
            res.status(404).json({ status: "Not Found", message: `Invoice not found` });
          }
    } catch (error) {
        next(error)
    }
}