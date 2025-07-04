export interface Session {
	user:
		| {
				id: string
				name: string
				email: string
				emailVerified: boolean
				createdAt: Date
				updatedAt: Date
				image?: string | null | undefined | undefined
		  }
		| undefined
	session:
		| {
				id: string
				createdAt: Date
				updatedAt: Date
				userId: string
				expiresAt: Date
				token: string
				ipAddress?: string | null | undefined | undefined
				userAgent?: string | null | undefined | undefined
		  }
		| undefined
}
