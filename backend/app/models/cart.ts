import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'

import Book from './book.js'
import User from './user.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare book_id: number

  @column()
  declare amount: number

  @manyToMany(() => Book, {
    pivotTable: 'create_cart_books',
    pivotColumns: ['amount'],
  })
  declare books: ManyToMany<typeof Book>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
