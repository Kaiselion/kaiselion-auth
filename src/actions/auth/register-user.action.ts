import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'
import { auth, getErrorMessage } from '@/lib/auth'
import { APIError } from 'better-auth/api'

export const registerUserAction = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(3, {
      message: 'El nombre debe tener al menos 3 caracteres'
    }),
    email: z.string().email({
      message: 'Por favor ingresa un email válido'
    }),
    password: z.string().min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
  }),
  handler: async ({ name, email, password }) => {
    try {
      const user = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password
        }
      })

      return {
        success: true,
        user
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
