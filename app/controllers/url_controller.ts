import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import QRCode from 'qrcode'
import { config } from 'process'

export default class UrlController {

  //  Affiche le formulaire
  async showForm({ request, view, response }: HttpContext) {
    const slug = request.input('slug')
    if (slug) {
      return response.redirect(`/${slug}`)
    }
    return view.render('url/index')
  }

  // Créer une URL courte
  async store({ request, view }: HttpContext) {

    const original = request.input('url')

    const slug = Math.random().toString(36).substring(2, 8)

    const shortUrl = `${request.protocol()}://${request.hostname()}/${slug}`

    const qrDataUrl = await QRCode.toDataURL(shortUrl, { width: 256 })

    // Sauvegarde en base PostgreSQL
    const url = await Url.create({
      originalUrl: original,
      slug,
      shortUrl,
      qrCode: qrDataUrl
    })

    return view.render('url/index', { result: url })
  }

  // Liste des URLs (page admin)
async index({ view }: HttpContext) {
  const urls = await Url.all()
  return view.render('url/list', { urls })
  }

  // Redirection via slug
  async redirect({ params, response }: HttpContext) {

    const entry = await Url.findBy('slug', params.slug)

    if (!entry) {
      return response.notFound('URL introuvable')
    }

    return response.redirect(entry.originalUrl)
  }

 async destroy({ params, response }: HttpContext) {
  const url = await Url.find(params.id)
  if (url) await url.delete()
  return response.redirect('/admin')
  }
  async edit({ params, view }: HttpContext) {
    const url = await Url.find(params.id)
    if (!url) return view.render('url/edit', { error: 'URL introuvable' })
    return view.render('url/edit', { url })
  }
  async update({ params, request, response }: HttpContext) {
    const url = await Url.find(params.id)
    if (!url) return response.notFound('URL introuvable')

  url.originalUrl = request.input('url')
  url.slug = request.input('slug') || url.slug
  url.shortUrl = `${request.protocol()}://${request.hostname()}/${url.slug}`
  url.qrCode = await QRCode.toDataURL(url.shortUrl, { width: 256 })

  await url.save()

  return response.redirect('/admin')
  }

}