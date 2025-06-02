import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'
import { getErrorMessage, auth } from '@/lib/auth'
// import { authClient } from '@/lib/auth-client'
import { APIError } from 'better-auth/api'

export const loginUserAction = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email({
      message: 'Por favor ingresa un email válido'
    }),
    password: z.string().min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
  }),
  handler: async ({ email, password }, { cookies }) => {
    try {
      const session = await auth.api.signInEmail({
        body: {
          email,
          password
        }
      })

      return {
        success: true,
        user: session.user
      }
    } catch (error) {
      // Si es un error de la API de Better Auth
      if (error instanceof APIError) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: getErrorMessage(error.message, 'es')
        })
      }

      // Cualquier otro tipo de error
      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'Ocurrió un error inesperado'
      })
    }
  }
})
