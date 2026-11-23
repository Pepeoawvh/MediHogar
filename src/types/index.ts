export type Prevision = 'FONASA' | 'ISAPRE' | 'PARTICULAR';

export interface Paciente {
  nombre: string;
  rut: string;
  email: string;
  prevision: Prevision;
}

export interface Examen {
  id: string;
  nombre: string;
  codigoLis: string;
  categoria: 'Sangre' | 'Orina' | 'Alta Complejidad';
  preparacion: string;
  precioBase: number;
}

export interface Cita {
  id: string;
  fecha: string;
  bloqueHorario: string;
  direccion: string;
  comuna: string;
  archivoOrdenNombre?: string;
  examenes: Examen[];
  subtotal: number;
  descuentoPrevision: number;
  totalCopago: number;
  estado: 'PAGADA' | 'PENDIENTE' | 'COMPLETADA';
  codigoTransaccion: string;
}

export interface Paciente {
  nombre: string;
  rut: string;
  email: string;
  telefono?: string; // <-- agrega esta línea
  prevision: Prevision;
}