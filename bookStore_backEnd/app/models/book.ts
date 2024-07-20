import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import DetailBook from './detail_book.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import TypeBook from './type_book.js'
import CategoryBook from './category_book.js'
import Auther from './auther.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type_book_id: number

  @column()
  declare category_id: number

  @column()
  declare auther_id: number

  @column()
  declare name_book: string

  @column()
  declare image_book: string

  @hasOne(() => DetailBook)
  declare detailBook: HasOne<typeof DetailBook>

  @belongsTo(() => TypeBook,{
    foreignKey: 'type_book_id'})
  declare typeBook: BelongsTo<typeof TypeBook>

  @belongsTo(() => CategoryBook,{
    foreignKey: 'category_id',
  })
  declare catetoryBook: BelongsTo<typeof CategoryBook>

  @belongsTo(() => Auther,{
    foreignKey: 'auther_id',})
  declare auther: BelongsTo<typeof Auther>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
