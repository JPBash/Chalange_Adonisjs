import vine from '@vinejs/vine'

/**
 * Validateur pour l'inscription (Register)
 */
export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8)
  })
)

/**
 * Validateur pour la connexion (Login) 
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string()
  })
)