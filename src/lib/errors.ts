import { auth } from './auth'

type ErrorTypes = Partial<
  Record<
    keyof typeof auth.$ERROR_CODES,
    {
      en: string
      es: string
    }
  >
>

const errorCodes = {
  ACCOUNT_NOT_FOUND: {
    en: 'Account not found',
    es: 'Cuenta no encontrada'
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: 'Credential account not found',
    es: 'Cuenta de credenciales no encontrada'
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: 'Email cannot be updated',
    es: 'El correo electrónico no puede ser actualizado'
  },
  EMAIL_NOT_VERIFIED: {
    en: 'Email not verified',
    es: 'Correo electrónico no verificado'
  },
  FAILED_TO_CREATE_SESSION: {
    en: 'Failed to create session',
    es: 'Error al crear la sesión'
  },
  FAILED_TO_CREATE_USER: {
    en: 'Failed to create user',
    es: 'Error al crear el usuario'
  },
  FAILED_TO_GET_SESSION: {
    en: 'Failed to get session',
    es: 'Error al obtener la sesión'
  },
  FAILED_TO_GET_USER_INFO: {
    en: 'Failed to get user information',
    es: 'Error al obtener la información del usuario'
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: 'Cannot unlink last account',
    es: 'No se puede desvincular la última cuenta'
  },
  FAILED_TO_UPDATE_USER: {
    en: 'Failed to update user',
    es: 'Error al actualizar el usuario'
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: 'ID token not supported',
    es: 'Token de ID no soportado'
  },
  INVALID_EMAIL: {
    en: 'Invalid email',
    es: 'Correo electrónico inválido'
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: 'Invalid email or password',
    es: 'Correo electrónico o contraseña inválidos'
  },
  INVALID_PASSWORD: {
    en: 'Invalid password',
    es: 'Contraseña inválida'
  },
  INVALID_TOKEN: {
    en: 'Invalid token',
    es: 'Token inválido'
  },
  PASSWORD_TOO_LONG: {
    en: 'Password is too long',
    es: 'La contraseña es demasiado larga'
  },
  PASSWORD_TOO_SHORT: {
    en: 'Password is too short',
    es: 'La contraseña es demasiado corta'
  },
  PROVIDER_NOT_FOUND: {
    en: 'Provider not found',
    es: 'Proveedor no encontrado'
  },
  SESSION_EXPIRED: {
    en: 'Session expired',
    es: 'Sesión expirada'
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: 'Social account already linked',
    es: 'Cuenta social ya vinculada'
  },
  USER_ALREADY_EXISTS: {
    en: 'User already exists',
    es: 'El usuario ya existe'
  },
  USER_EMAIL_NOT_FOUND: {
    en: 'User email not found',
    es: 'Correo electrónico del usuario no encontrado'
  },
  USER_NOT_FOUND: {
    en: 'User not found',
    es: 'Usuario no encontrado'
  }
} satisfies ErrorTypes

export const getErrorMessage = (code: string, lang: 'en' | 'es') => {
  // Convertir el código a formato de clave (mayúsculas y guiones bajos)
  const normalizedCode = code.toUpperCase().replace(/[-\s]/g, '_')

  if (normalizedCode in errorCodes) {
    return errorCodes[normalizedCode as keyof typeof errorCodes][lang]
  }

  // Mensaje por defecto si no encontramos el código
  return lang === 'es'
    ? 'Ocurrió un error inesperado'
    : 'An unexpected error occurred'
}
