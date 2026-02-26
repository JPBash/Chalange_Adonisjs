import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()

// Ajout .defaultTo(this.now()) :
    table.timestamp('created_at').notNullable().defaultTo(this.now())
    table.timestamp('updated_at').nullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}