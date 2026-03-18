import router from '@adonisjs/core/services/router'

import UrlController from '#controllers/url_controller'
import AuthController from '#controllers/auth_controller'

router.get('/', [UrlController, 'showForm'])
router.post('/shorten', [UrlController, 'store'])
router.get('/:slug', [UrlController, 'redirect'])

router.get('/register', [AuthController, 'showRegister'])
router.post('/register', [AuthController, 'register'])

router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])
router.get('/logout', [AuthController, 'logout'])

router
  .group(() => {
    router.get('/admin', [UrlController, 'index'])
    router.post('/shorten', [UrlController, 'store'])
    router.post('/urls/:id/delete', [UrlController, 'destroy'])
  })
  .middleware(['auth']) // Protection des routes admin avec le middleware d'authentification