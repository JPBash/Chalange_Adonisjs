import router from '@adonisjs/core/services/router'
import UrlController from '#controllers/url_controller'

router.get('/', [UrlController, 'showForm'])
router.post('/shorten', [UrlController, 'store'])
router.get('/admin', [UrlController, 'index'])
router.get('/:slug', [UrlController, 'redirect'])
router.post('/urls/:id/delete', [UrlController, 'destroy'])