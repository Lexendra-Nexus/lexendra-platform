// Generar ID único
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Combinar clases CSS
export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Validar email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Validar tamaño de archivo
export function isValidFileSize(sizeBytes: number, maxSizeMB: number): boolean {
  return sizeBytes <= maxSizeMB * 1024 * 1024
}