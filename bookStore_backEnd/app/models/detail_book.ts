import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class DetailBook extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare book_id: number 

  @column()
  declare description: String  

  @column()
  declare publisher:String  

  @column()
  declare price: number
  
  @column()
  declare amount: number
  
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}