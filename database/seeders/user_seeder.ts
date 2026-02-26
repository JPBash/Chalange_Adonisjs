import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const email = 'jpierrebash@example.com'
    const password = 'admin1234'
    const user = await User.findBy('email', email)

    if (user) {
      user.merge({ name: 'JEAN PIERRE BASHIZI', password })
      await user.save()
    } else {
      await User.create({
        name: 'JEAN PIERRE BASHIZI',
        email,
        password,
      })
    }

    const savedUser = user ?? (await User.findByOrFail('email', email))

    const existingRole = await savedUser.related('role').query().first()
    if (existingRole) {
      existingRole.merge({ name: 'ADMIN' })
      await existingRole.save()
    } else {
      await savedUser.related('role').create({
        name: 'ADMIN',
      })
    }
  }
}