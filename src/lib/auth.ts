import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@prisma/client'

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql' // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true
  }
})

export * from './errors'
