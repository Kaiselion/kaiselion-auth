import { auth } from '@/lib/auth'
import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const authPaths = ['/dashboard']
  const noAuthPaths = ['/', '/login', '/register', 'forgotpassword']

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers
  })

  if (noAuthPaths.includes(context.url.pathname) && isAuthed) {
    return next()
  }
  if (authPaths.includes(context.url.pathname) && !isAuthed) {
    return context.redirect('/login')
  }

  if (isAuthed) {
    context.locals.user = isAuthed.user
    context.locals.session = isAuthed.session
  } else {
    context.locals.user = null
    context.locals.session = null
  }

  return next()
})
