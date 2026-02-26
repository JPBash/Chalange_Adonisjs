import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'actualites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
table
  .integer('user_id')
  .notNullable()
  .references('id')
  .inTable('users')
  .onDelete('CASCADE')
table.string('title').notNullable()
table.text('content').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}