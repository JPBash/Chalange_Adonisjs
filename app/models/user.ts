import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Actualite from '#models/actualite'

export default class User extends BaseModel {
  @hasOne(() => Role)
  declare role: HasOne<typeof Role>

  @hasOne(() => Actualite)
  declare actualites: HasOne<typeof Actualite>
}
