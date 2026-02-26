
import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
import UsersController from '#controllers/users_controller'

router.get('/', ({view }: HttpContext) => view.render('pages/home'))
router.get('/register', [UsersController, 'showRegister'])
router.post('/users', [UsersController, 'store'])
router.get('/login', [UsersController, 'showLogin'])
router.post('/users/login', [UsersController, 'store'])
