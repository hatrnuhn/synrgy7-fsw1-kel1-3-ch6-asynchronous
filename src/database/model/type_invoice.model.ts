import { Model, ModelObject } from "objection";
import { InvoiceModel } from "./invoice.model";

export class TypeInvoiceModel extends Model {
  id!: number;
  price!: number;
  name!: string;

  static get tableName() {
    return "type_invoice";
  }

  static get relationMappings() {
    return {
        invoice: {
            relation: Model.HasManyRelation,
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
