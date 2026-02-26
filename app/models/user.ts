import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Actualite from '#models/actualite'
import Module from '#models/module'


export default class User extends BaseModel {
  @hasOne(() => Role)
  declare roles: HasOne<typeof Role>
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare password: string
    @hasOne(() => Role)
  declare role: HasOne<typeof Role>
  @hasMany(() => Actualite)
  declare actualites: HasMany<typeof Actualite>
    @manyToMany(() => Module, { pivotTable: 'users_modules' })
  declare modules: ManyToMany<typeof Module>


}
