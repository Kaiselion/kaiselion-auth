import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
// If your Prisma file is located elsewhere, you can change the path
import prisma from './db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql' // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: [
    // Agrega tu dominio de producción aquí
    'https://auth.kaisel.cc'
  ]
})

export * from './errors'
