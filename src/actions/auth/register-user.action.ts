import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'
import { auth } from '@/lib/auth'

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
      if (error instanceof ActionError) {
        throw error
      }

      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'Ocurrió un error inesperado'
      })
    }
  }
})
