import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class UsersController {
  // Affiche la page d'inscription
  async showRegister({ view }: HttpContext) {
    return view.render('pages/register')
  }

  // Affiche la page de connexion
  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  // Gère l'inscription (POST /register)
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }

  // Gère la connexion (POST /login)
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.all()
    
    try {
      // Vérifie les identifiants dans la base
      const user = await User.verifyCredentials(email, password)
      // Connecte l'utilisateur
      await auth.use('web').login(user)
      return response.redirect().toPath('/')
    } catch (error) {
      // En cas d'erreur (identifiants invalides), retourne une réponse d'erreur
      return response.badRequest('Email ou mot de passe incorrect')
    }
  }
}