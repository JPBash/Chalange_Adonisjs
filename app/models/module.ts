import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Module extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @manyToMany(() => User, { pivotTable: 'users_modules' })
  declare users: ManyToMany<typeof User>
}