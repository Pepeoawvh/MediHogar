'use client';

import React, { createContext, useContext, useState } from 'react';
import { Cita, Examen, Paciente } from '@/types';

interface MediHogarContextType {
  paciente: Paciente | null;
  setPaciente: (paciente: Paciente | null) => void;
  vistaActiva: string;
  setVistaActiva: (vista: string) => void;
  examenesSeleccionados: Examen[];
  toggleExamen: (examen: Examen) => void;
  archivoOrden: string | null;
  setArchivoOrden: (nombre: string | null) => void;
  citas: Cita[];
  agregarCita: (cita: Cita) => void;
  limpiarBorrador: () => void;
}

const MediHogarContext = createContext<MediHogarContextType | undefined>(undefined);

export function MediHogarProvider({ children }: { children: React.ReactNode }) {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [vistaActiva, setVistaActiva] = useState<string>('registro');
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<Examen[]>([]);
  const [archivoOrden, setArchivoOrden] = useState<string | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);

  const toggleExamen = (examen: Examen) => {
    setExamenesSeleccionados((prev) => {
      const existe = prev.some((e) => e.id === examen.id);
      if (existe) {
        return prev.filter((e) => e.id !== examen.id);
      }
      return [...prev, examen];
    });
  };

  const agregarCita = (cita: Cita) => {
    setCitas((prev) => [cita, ...prev]);
  };

  const limpiarBorrador = () => {
    setExamenesSeleccionados([]);
    setArchivoOrden(null);
  };

  return (
    <MediHogarContext.Provider
      value={{
        paciente,
        setPaciente,
        vistaActiva,
        setVistaActiva,
        examenesSeleccionados,
        toggleExamen,
        archivoOrden,
        setArchivoOrden,
        citas,
        agregarCita,
        limpiarBorrador,
      }}
    >
      {children}
    </MediHogarContext.Provider>
  );
}

export function useMediHogar() {
  const context = useContext(MediHogarContext);
  if (!context) {
    throw new Error('useMediHogar debe usarse dentro de un MediHogarProvider');
  }
  return context;
}