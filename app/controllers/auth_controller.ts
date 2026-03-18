import { register } from "module"

// import type { HttpContext } from '@adonisjs/core/http'
 async register({ request, response }: HttpContext) {
    const { email, password, full_name } = request.only(['email', 'password', 'full_name'])

    // Validation basique
    if (!email || !password) {
      return response.badRequest('Email et mot de passe requis')
    }