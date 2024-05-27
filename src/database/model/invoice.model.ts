import { Model, ModelObject } from "objection";
import { TypeInvoiceModel } from "./type_invoice.model";
import { UsersModel } from "./users.model";

export class InvoiceModel extends Model {
  id!: number;
  user_id!: number;
  type_invoice_id!: number;
  total_amount!: number;
  status!: string;
  quantity!: number;
  user!: UsersModel;
  type_invoice!: TypeInvoiceModel;

  static get tableName() {
    return "invoice";
  }

  static get relationMappings() {
    return {
      type_invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: TypeInvoiceModel,
        join: {
          from: "invoice.type_invoice_id",
          to: "type_invoice.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'invoice.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export type Invoice = ModelObject<InvoiceModel>;
