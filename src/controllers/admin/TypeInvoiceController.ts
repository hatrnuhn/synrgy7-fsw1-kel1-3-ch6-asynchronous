import { NextFunction, Request, Response } from "express";
import { TypeInvoiceModel } from "../../database/model/type_invoice.model";

export const getAllTypeInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const typeInvoices = await TypeInvoiceModel.query().withGraphFetched('invoice');
    if (typeInvoices) {
      res.status(200).json({ status: "Success", message: "Get all type invoice successfully", data: typeInvoices });
    } else {
      res.status(404).json({ status: "Not Found", message: "Failed to Get all type invoice", data: typeInvoices });
    }
  } catch (error) {
    next(error);
  }
};

export const getTypeInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const typeInvoice = await TypeInvoiceModel.query().findById(id);
    if (typeInvoice) {
      res
        .status(200)
        .json({ status: "Success", message: `Get type invoice with id ${id} successfully`, data: typeInvoice });
    } else {
      res.status(404).json({ status: "Not Found", message: `Type invoice with id ${id} not found`, data: typeInvoice });
    }
  } catch (error) {
    next(error);
  }
};

export const createTypeInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { price, name } = req.body;

    const typeInvoice = await TypeInvoiceModel.query().insert({ price, name });
    if (typeInvoice) {
      res.status(200).json({ status: "Success", message: `Create new type invoice successfully` });
    } else {
      res.status(400).json({ status: "Failed", message: `Failed to create new type invoice` });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTypeInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { price, name } = req.body;
    const { id } = req.params;

    const typeInvoice = await TypeInvoiceModel.query().findById(id).update({price, name});
    if (typeInvoice) {
      res.status(200).json({ status: "Success", message: `Update type invoice id ${id} successfully`, data: typeInvoice });
    } else {
      res.status(404).json({ status: "Not Found", message: `Failed to update type invoice` });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTypeInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const typeInvoice = await TypeInvoiceModel.query().deleteById(id);
    if (typeInvoice) {
      res.status(200).json({ status: "Success", message: `Delete type invoice id ${id} successfully` });
    } else {
      res.status(404).json({ status: "Not Found", message: `Type invoice not found` });
    }
  } catch (error) {
    next(error);
  }
};
