import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detail_books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
      
      table.string('description').nullable()
      table.string('publisher').nullable()
      table.integer('price').nullable()
      table.integer('amount').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}