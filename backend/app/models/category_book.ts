import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import TypeBook from './type_book.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class CategoryBook extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type_book_id: number
  @column()
  declare name_category: string

  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TypeBook,{
    foreignKey: 'type_book_id'})
  declare typeBook: BelongsTo<typeof TypeBook>
  
  @hasOne(() => Book)
  declare book: HasOne<typeof Book>
}
