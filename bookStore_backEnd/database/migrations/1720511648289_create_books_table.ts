import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('type_book_id').unsigned().references('type_books.id').onDelete('SET NULL')
      table.integer('category_id').unsigned().references('category_books.id').onDelete('SET NULL ')
      table.integer('auther_id').unsigned().references('authers.id').onDelete('SET NULL')

      table.string('name_book').notNullable().unique()
      table.string('image_book').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
