import { Knex } from 'knex';
import { randomInt } from 'crypto';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("invoice").del();

  const customerIds = await knex('users').pluck('id');
  const typeInvoice = await knex('type_invoice').select('id', 'price');

  // Inserts seed entries
  const invoices = Array(10)
    .fill(null)
    .map(() => {
      const TypeInvoiceItem = typeInvoice[randomInt(0, typeInvoice.length - 1)];
      const quantity = randomInt(1, 10);

      return {
        user_id: customerIds[randomInt(0, customerIds.length - 1)],
        type_invoice_id: TypeInvoiceItem.id,
        quantity: quantity,
        total_amount: TypeInvoiceItem.price * quantity,
        status: 'unpaid',
      };
    });

    console.log(invoices);
    
  await knex("invoice").insert(invoices);
}