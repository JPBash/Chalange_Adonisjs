/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import QRCode from 'qrcode'

const users = [
    { id: 1, name: 'Alice', email: 'alice@exemple.com' },
    { id: 2, name: 'Bob', email: 'bob@exemple.com' },
    { id: 3, name: 'Charlie', email: 'charlie@exemple.com' },
    { id: 4, name: 'David', email: 'david@exemple.com' },
]

function helloWorld() {
    return 'Hello world'
}



router.get('/apprenants', function getApprenants() {
    return users
})

function getApprenant(ctx) {
    const id = ctx.params.id
    return users.find((user) => user.id === parseInt(id))
}

router.get('/apprenants/:id', getApprenant)

// Données en mémoire (exemples)
const actualites = []

// Routes pour les vues frontend
router.get('/inscription', async ({ view }) => {
    return view.render('inscription.index')
})

router.get('/connexion', async ({ view }) => {
    return view.render('connexion.index')
})

router.get('/discussions', async ({ view }) => {
    return view.render('discussions.index')
})

router.get('/groupes', async ({ view }) => {
    return view.render('groupes.index')
})

router.get('/actualites', async ({ view }) => {
    return view.render('actualites.index', { actualites })
})

router.get('/actualites/creer', async ({ view }) => {
    return view.render('actualites.creer')
})

router.post('/actualites', async ({ request, response }) => {
    const payload = request.only(['title', 'content'])
    actualites.push({ id: actualites.length + 1, ...payload })
    return response.redirect('/actualites')
})

router.get('/profil', async ({ view }) => {
    // Exemple: prendre le premier utilisateur comme profil courant
    const user = users[0]
    const data = JSON.stringify({ id: user.id, name: user.name, email: user.email })
    const qrcode = await QRCode.toDataURL(data)
    return view.render('profil.index', { user, qrcode })
})

// Route API example
router.get('/utilisateurs', () => {
    return { message: 'Liste des utilisateurs' }
})


function renderHome(ctx)

{    return ctx.view.render('pages/home')
}
router.get('/', renderHome)

import UsersController from '#controllers/users_controller'

router.get('/users', 'UsersController.index')
router.get('/users/:id', 'UsersController.showRegister')

