import axios from 'axios';
import { Address } from '../types';

const VIACEP_BASE_URL = 'https://viacep.com.br/ws';

/**
 * Fetch address data from ViaCEP API
 * @param cep - Brazilian CEP (8 digits, with or without hyphen)
 * @returns Address data or null if not found
 */
export async function fetchAddressByCep(cep: string): Promise<Address | null> {
  // Clean CEP (remove non-numeric characters)
  const cleanCep = cep.replace(/\D/g, '');

  // Validate CEP format
  if (cleanCep.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos');
  }

  try {
    const response = await axios.get<Address>(`${VIACEP_BASE_URL}/${cleanCep}/json/`);

    // ViaCEP returns { erro: true } for invalid CEPs
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('CEP inválido');
      }
      throw new Error('Erro de conexão. Verifique sua internet.');
    }
    throw error;
  }
}

/**
 * Format CEP with hyphen (XXXXX-XXX)
 */
export function formatCep(cep: string): string {
  const clean = cep.replace(/\D/g, '');
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
}

/**
 * Validate CEP format
 */
export function isValidCep(cep: string): boolean {
  const clean = cep.replace(/\D/g, '');
  return clean.length === 8;
}



