import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Url extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare originalUrl: string

  @column()
  declare slug: string

  @column()
  declare shortUrl: string

  @column()
  declare qrCode: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}