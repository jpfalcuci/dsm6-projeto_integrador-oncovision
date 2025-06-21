'use client'
import { TOKEN_KEY, USER_KEY } from '@/constants/system'

/**
 * Classe para gerenciar operações de armazenamento no localStorage
 */
class LocalStorageManager {
  private isClient: boolean

  constructor() {
    this.isClient = typeof window !== 'undefined'
  }

  /**
   * Salva um valor no localStorage
   * @param key Chave do item
   * @param value Valor a ser armazenado
   */
  save(key: string, value: string): void {
    if (this.isClient) {
      localStorage.setItem(key, value)
    }
  }

  /**
   * Recupera um valor do localStorage
   * @param key Chave do item
   * @returns O valor armazenado ou null se não existir
   */
  get(key: string): string | null {
    if (this.isClient) {
      return localStorage.getItem(key)
    }
    return null
  }

  /**
   * Remove um item do localStorage
   * @param key Chave do item a ser removido
   */
  remove(key: string): void {
    if (this.isClient) {
      localStorage.removeItem(key)
    }
  }

  /**
   * Verifica se um item existe no localStorage
   * @param key Chave do item
   * @returns true se o item existir
   */
  has(key: string): boolean {
    if (this.isClient) {
      return localStorage.getItem(key) !== null
    }
    return false
  }

  /**
   * Limpa todos os itens do localStorage
   */
  clear(): void {
    if (this.isClient) {
      localStorage.clear()
    }
  }
}

// Singleton para reuso em toda aplicação
const storageManager = new LocalStorageManager()

/* 
    FUNÇÕES DE TOKEN
*/
export const saveToken = (token: string): void => {
  storageManager.save(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
  return storageManager.get(TOKEN_KEY)
}

export const removeToken = (): void => {
  storageManager.remove(TOKEN_KEY)
}

export const hasToken = (): boolean => {
  return storageManager.has(TOKEN_KEY)
}

/*
    FUNÇÕES DE USUÁRIO
*/
export const saveUser = (user: string): void => {
  storageManager.save(USER_KEY, user)
}

export const getUser = (): string | null => {
  return storageManager.get(USER_KEY)
}

export const removeUser = (): void => {
  storageManager.remove(USER_KEY)
}

export const hasUser = (): boolean => {
  return storageManager.has(USER_KEY)
}

/**
 * Limpa todos os dados da sessão (token e usuário)
 */
export const clearSession = (): void => {
  removeToken()
  removeUser()
}

/**
 * Verifica se o usuário está autenticado
 * @returns true se o usuário estiver autenticado
 */
export const isAuthenticated = (): boolean => {
  return hasToken() && hasUser()
}

export default storageManager