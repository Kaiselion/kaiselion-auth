import { auth } from '@/lib/auth'
import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const isAuthed = await auth.api.getSession({
      headers: context.request.headers
    })

    if (isAuthed) {
      context.locals.user = isAuthed.user
      context.locals.session = isAuthed.session
    } else {
      context.locals.user = null
      context.locals.session = null
    }

    return next()
  } catch (error) {
    console.error('Error en middleware de autenticación:', error)
    // Manejar el error de forma más elegante
    return new Response('Error de autenticación', { status: 500 })
  }
})
