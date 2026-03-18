import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {

  // Affiche formulaire inscription
  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  // 📌 INSCRIPTION
  async register({ request, response }: HttpContext) {

    const data = request.only(['name', 'email', 'password'])

    await User.create(data)

    return response.redirect('/login')
  }

  // Affiche formulaire login
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  // 📌 CONNEXION
  async login({ request, auth, response }: HttpContext) {

    const email = request.input('email')
    const password = request.input('password')

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect('/admin')
  }

  // 📌 DÉCONNEXION
  async logout({ auth, response }: HttpContext) {

    await auth.use('web').logout()

    return response.redirect('/')
  }
}