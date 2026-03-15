import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Urls extends BaseSchema {
  protected tableName = 'urls'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('original_url').notNullable()
      table.string('slug').notNullable().unique()
      table.string('short_url').notNullable().unique()

      table.text('qr_code').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}