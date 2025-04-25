import { DocumentType } from './document-type.enum';

/**
 * Utilidades para verificación de documentos según la DIAN
 */
export class DocumentVerification {
  /**
   * Calcula el dígito de verificación para documentos de identidad colombianos
   * @param documentId Número de documento sin dígito de verificación
   * @param documentType Tipo de documento (NIT, CC, CE, etc.)
   * @returns Dígito de verificación calculado
   */
  static calculateVerificationDigit(documentId: string, documentType: DocumentType): number {
    // Para NIT (personas jurídicas)
    if (documentType === DocumentType.NIT) {
      return DocumentVerification.calculateNitVerificationDigit(documentId);
    }
    
    // Para cédulas de ciudadanía (personas naturales)
    if (documentType === DocumentType.CC) {
      return DocumentVerification.calculateCedulaVerificationDigit(documentId);
    }
    
    // Para otros tipos de documentos, retornar 0 por defecto
    return 0;
  }

  /**
   * Calcula el dígito de verificación para NIT según algoritmo de la DIAN
   */
  private static calculateNitVerificationDigit(documentId: string): number {
    const weights = [41, 37, 29, 23, 19, 17, 13, 7, 3];
    let sum = 0;
    
    // Tomar los primeros 9 dígitos del NIT
    const digits = documentId.padStart(9, '0').substring(0, 9).split('').map(Number);
    
    // Calcular la suma ponderada
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * weights[i];
    }
    
    // Calcular el dígito de verificación
    const remainder = sum % 11;
    if (remainder === 0) return 0;
    if (remainder === 1) return 1;
    return 11 - remainder;
  }

  /**
   * Calcula el dígito de verificación para cédulas de ciudadanía
   * Nota: Este es un algoritmo simplificado, la DIAN tiene un algoritmo más complejo
   */
  private static calculateCedulaVerificationDigit(documentId: string): number {
    // Algoritmo simplificado para cédulas
    const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43];
    let sum = 0;
    
    // Tomar los primeros 10 dígitos de la cédula
    const digits = documentId.padStart(10, '0').substring(0, 10).split('').map(Number);
    
    // Calcular la suma ponderada
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * weights[i];
    }
    
    // Calcular el dígito de verificación
    const remainder = sum % 11;
    if (remainder === 0) return 0;
    if (remainder === 1) return 1;
    return 11 - remainder;
  }
} 