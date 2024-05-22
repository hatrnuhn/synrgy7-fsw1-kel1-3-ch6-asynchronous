import { Model, ModelObject } from "objection";
import { TypeInvoiceModel } from "./type_invoice.model";

export class InvoiceModel extends Model {
  id!: number;
  amount!: number;
  type_invoice_id!: number;
  status!: string;

  static get tableName() {
    return "invoice";
  }
 
  static get relationMappings() {
    return {
        type_invoices: {
            relation: Model.HasManyRelation,
            modelClass: TypeInvoiceModel,
            join: {
                from : 'invoice.type_invoice_id',
                to : 'type_invoice.id'
            }
        }
    }
  }
}

export type Articles = ModelObject<InvoiceModel>;
