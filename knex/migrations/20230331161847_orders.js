/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('orders', function(table) {
      table.increments('orderId').primary();
      table.string('referId').notNullable().unique();
      table.integer('customerId', 10).unsigned().notNullable().references('customerId').inTable('customers');
      table.string('status', 35).notNullable();
      table.decimal('grandTotal', 12, 4).notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.index(['status']);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
  };
  