import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Cart extends BaseModel {
    @column({ isPrimary: true })
    declare id: number
    
    
    
}
    