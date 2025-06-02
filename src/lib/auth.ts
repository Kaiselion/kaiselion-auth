import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   datasourceUrl: import.meta.env.DATABASE_URL
// }).$extends(withAccelerate())

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql' // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: import.meta.env.GOOGLE_CLIENT_ID as string,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET as string
    }
  }
})

export * from './errors'
