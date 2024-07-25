import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { has } from 'lodash'
import CategoryBook from './category_book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class TypeBook extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name_type: string

  @hasMany(() => CategoryBook)
  declare categotyBooks: HasMany<typeof CategoryBook>

  @hasMany(() => Book)
  declare books: HasMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
