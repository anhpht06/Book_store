import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'
import User from './user.js'
export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare name_user: String
  @column()
  declare address: String

  @column()
  declare phone: number

  @column()
  declare total_quantity: number

  @column()
  declare total_price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Book, {
    pivotTable: 'orders_books',
    pivotColumns: ['amount'],
  })
  declare books: ManyToMany<typeof Book>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
