import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profile_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('user_name').nullable()
      table.string('phone').nullable().unique()
      table.integer('age').nullable()
      table.string('gender').nullable()
      table.string('address').nullable()
      table.string('avatar').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
