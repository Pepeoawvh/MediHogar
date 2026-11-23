import { Examen, Prevision } from '@/types';

export const CATALOGO_EXAMENES: Examen[] = [
  {
    id: 'ex-1',
    nombre: 'Hemograma Completo',
    codigoLis: 'LIS-0101',
    categoria: 'Sangre',
    preparacion: 'No requiere ayuno estricto (recomendado 4 horas).',
    precioBase: 12500,
  },
  {
    id: 'ex-2',
    nombre: 'Perfil Bioquímico',
    codigoLis: 'LIS-0102',
    categoria: 'Sangre',
    preparacion: 'Requiere ayuno de 8 a 12 horas.',
    precioBase: 18900,
  },
  {
    id: 'ex-3',
    nombre: 'Perfil Lipídico',
    codigoLis: 'LIS-0105',
    categoria: 'Sangre',
    preparacion: 'Requiere ayuno estricto de 12 horas.',
    precioBase: 15400,
  },
  {
    id: 'ex-4',
    nombre: 'Orina Completa + Urocultivo',
    codigoLis: 'LIS-0201',
    categoria: 'Orina',
    preparacion: 'Primera orina de la mañana, segundo chorro en frasco estéril.',
    precioBase: 14200,
  },
  {
    id: 'ex-5',
    nombre: 'Perfil Tiroideo (TSH, T3, T4 Libre)',
    codigoLis: 'LIS-0304',
    categoria: 'Alta Complejidad',
    preparacion: 'Ayuno de 8 horas. No suspender medicación salvo indicación médica.',
    precioBase: 32000,
  },
  {
    id: 'ex-6',
    nombre: 'Vitamina D (25-OH)',
    codigoLis: 'LIS-0310',
    categoria: 'Alta Complejidad',
    preparacion: 'No requiere ayuno.',
    precioBase: 28500,
  },
];

export const COMUNAS_COBERTURA: string[] = [
  'Providencia',
  'Las Condes',
  'Ñuñoa',
  'Santiago Centro',
  'Vitacura',
  'Viña del Mar',
  'Quilpué',
  'Valparaíso',
];

export const COBERTURA_PREVISION: Record<
  Prevision,
  { label: string; descuento: number }
> = {
  FONASA: { label: 'Fonasa', descuento: 0.4 },
  ISAPRE: { label: 'Isapre', descuento: 0.55 },
  PARTICULAR: { label: 'Particular', descuento: 0 },
};