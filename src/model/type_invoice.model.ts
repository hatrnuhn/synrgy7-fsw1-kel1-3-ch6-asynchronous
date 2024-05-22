import { Model, ModelObject } from "objection";
import { InvoiceModel } from "./invoice.model";

export class TypeInvoiceModel extends Model {
  id!: number;
  total_invoice!: number;
  type_invoice!: string;

  static get tableName() {
    return "invoice";
  }
  static get relationMappings() {
    return {
        invoice: {
            relation: Model.BelongsToOneRelation,
            modelClass: InvoiceModel,
            join: {
                from : 'type_invoice.id',
                to : 'invoice.type_invoice_id'
            }
        }
    }
  }

}

export type TypeInvoice = ModelObject<TypeInvoiceModel>;
