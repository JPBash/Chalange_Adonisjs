import { DateTime } from 'luxon'
import { hash } from '@adonisjs/core/services/hash'
import { BaseModel, column, hasMany, manyToMany, beforeSave } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Actualite from '#models/actualite'
import Module from '#models/module'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare Name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  // le champ rôle directement dans la table users, avec une énumération pour les valeurs possibles ('user' ou 'admin') et une valeur par défaut de 'user'
  @column()
  declare role: 'user' | 'admin'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Cette fonction hache le mot de passe avant de sauvegarder l'utilisateur dans la base de données. Elle est déclenchée automatiquement grâce au décorateur `@beforeSave()`. Si le mot de passe a été modifié (indiqué par `user.$dirty.password`), il sera haché à l'aide du service de hachage d'AdonisJS avant d'être enregistré.
   */
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  /**
   * Relations 
   */
  @hasMany(() => Actualite)
  declare actualites: HasMany<typeof Actualite>

  @manyToMany(() => Module, { pivotTable: 'users_modules' })
  declare modules: ManyToMany<typeof Module>
}