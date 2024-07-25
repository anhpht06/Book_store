import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'category_books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('name_categoty', 'name_category')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}