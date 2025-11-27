import axios from 'axios';
import { FreteOption } from '../types';

/**
 * Simulates freight calculation
 * Note: The real Correios API requires authentication and is complex.
 * This is a simplified simulation for demonstration purposes.
 */

// Simulated freight options based on distance (CEP range)
const FRETE_BASE_VALUES = {
  SEDEX: { base: 25.90, perKg: 5.50, prazo: '1-2 dias úteis' },
  PAC: { base: 15.90, perKg: 3.50, prazo: '5-8 dias úteis' },
  SEDEX_10: { base: 45.90, perKg: 8.50, prazo: '1 dia útil (até 10h)' },
};

/**
 * Calculate distance factor based on CEP regions
 * First 2 digits of CEP indicate the region
 */
function getDistanceFactor(originCep: string, destCep: string): number {
  const originRegion = parseInt(originCep.slice(0, 2), 10);
  const destRegion = parseInt(destCep.slice(0, 2), 10);
  
  const diff = Math.abs(originRegion - destRegion);
  
  // Same region = 1x, different regions increase price
  if (diff === 0) return 1;
  if (diff <= 10) return 1.2;
  if (diff <= 30) return 1.5;
  if (diff <= 50) return 1.8;
  return 2.0;
}

/**
 * Simulate freight calculation
 * @param originCep - Origin CEP (store location)
 * @param destCep - Destination CEP (customer)
 * @param weightKg - Total weight in kg
 */
export async function calculateFrete(
  originCep: string,
  destCep: string,
  weightKg: number = 0.5
): Promise<FreteOption[]> {
  // Clean CEPs
  const cleanOrigin = originCep.replace(/\D/g, '');
  const cleanDest = destCep.replace(/\D/g, '');

  // Validate
  if (cleanOrigin.length !== 8 || cleanDest.length !== 8) {
    throw new Error('CEP inválido');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const distanceFactor = getDistanceFactor(cleanOrigin, cleanDest);

  const options: FreteOption[] = [
    {
      codigo: '40010',
      nome: 'SEDEX',
      valor: ((FRETE_BASE_VALUES.SEDEX.base + weightKg * FRETE_BASE_VALUES.SEDEX.perKg) * distanceFactor).toFixed(2),
      prazo: FRETE_BASE_VALUES.SEDEX.prazo,
    },
    {
      codigo: '41106',
      nome: 'PAC',
      valor: ((FRETE_BASE_VALUES.PAC.base + weightKg * FRETE_BASE_VALUES.PAC.perKg) * distanceFactor).toFixed(2),
      prazo: FRETE_BASE_VALUES.PAC.prazo,
    },
    {
      codigo: '40215',
      nome: 'SEDEX 10',
      valor: ((FRETE_BASE_VALUES.SEDEX_10.base + weightKg * FRETE_BASE_VALUES.SEDEX_10.perKg) * distanceFactor).toFixed(2),
      prazo: FRETE_BASE_VALUES.SEDEX_10.prazo,
    },
  ];

  return options;
}

// Store CEP (São Paulo - example)
export const STORE_CEP = '01310-100';

/**
 * Calculate frete from store to customer
 */
export async function calculateFreteFromStore(
  destCep: string,
  weightKg: number = 0.5
): Promise<FreteOption[]> {
  return calculateFrete(STORE_CEP, destCep, weightKg);
}



