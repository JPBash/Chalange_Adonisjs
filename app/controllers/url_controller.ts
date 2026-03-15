import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import UrlController from '#controllers/url_controller'


type UrlEntry = {
  slug: string
  originalUrl: string
}

// stockage en mémoire
const urls: UrlEntry[] = []

// fonction pour générer un slug
function generateSlug() {
  return Math.random().toString(36).substring(2, 8)
}

export default class UrlController {

  // Affiche le formulaire
  async showForm({ view }: HttpContext) {
    return view.render('url/index')
  }

  // Traite la création d’une URL courte
  async store({ request, view }: HttpContext) {

    const original = request.input('url')

    const slug = generateSlug()

    const shortUrl = `${request.protocol()}://${request.host()}/${slug}`

    urls.push({
      slug,
      originalUrl: original
    })

    const qrDataUrl = await QRCode.toDataURL(shortUrl, { width: 256 })

    const result = {
      originalUrl: original,
      shortUrl,
      slug,
      qrDataUrl
    }

    return view.render('url/index', { result })
  }

  // Redirection vers URL originale
  async redirect({ params, response }: HttpContext) {

    const entry = urls.find(u => u.slug === params.slug)

    if (!entry) {
      return response.notFound('URL introuvable')
    }

    return response.redirect(entry.originalUrl)
  }

  // Page admin : liste des URLs
  async index({ view }: HttpContext) {
    return view.render('url/list', { urls })
  }
}