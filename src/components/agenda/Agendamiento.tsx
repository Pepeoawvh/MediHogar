'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Crosshair,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Navigation,
} from 'lucide-react';
import { COMUNAS_COBERTURA } from '@/data/mockCatalogo';

export interface DatosAgenda {
  direccion: string;
  comuna: string;
  referencia: string;
  fecha: string;
  bloqueHorario: string;
  coordenadas?: { lat: number; lng: number };
}

interface Props {
  onVolver: () => void;
  onContinuar: (datos: DatosAgenda) => void;
}

const BLOQUES_HORARIOS = [
  { id: 'b1', rango: '07:30 - 09:00', etiqueta: 'Ideal para ayuno' },
  { id: 'b2', rango: '09:00 - 10:30', etiqueta: 'Disponible' },
  { id: 'b3', rango: '10:30 - 12:00', etiqueta: 'Disponible' },
  { id: 'b4', rango: '14:30 - 16:00', etiqueta: 'Tarde' },
];

const generarProximosDias = () => {
  const dias = [];
  const hoy = new Date();
  for (let i = 1; i <= 5; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    const iso = fecha.toISOString().split('T')[0];
    const diaSemana = fecha.toLocaleDateString('es-CL', { weekday: 'short' });
    const diaNum = fecha.getDate();
    const mes = fecha.toLocaleDateString('es-CL', { month: 'short' });
    dias.push({ iso, diaSemana, diaNum, mes });
  }
  return dias;
};

export default function Agendamiento({ onVolver, onContinuar }: Props) {
  const diasDisponibles = generarProximosDias();

  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState(COMUNAS_COBERTURA[0]);
  const [referencia, setReferencia] = useState('');
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | undefined>();
  const [ubicando, setUbicando] = useState(false);

  const [fecha, setFecha] = useState(diasDisponibles[0].iso);
  const [bloqueHorario, setBloqueHorario] = useState(BLOQUES_HORARIOS[0].rango);
  const [error, setError] = useState('');

  const detectarUbicacion = () => {
    setUbicando(true);
    setError('');

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordenadas({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
          });
          if (!direccion) {
            setDireccion('Av. Providencia 1234');
          }
          setUbicando(false);
        },
        () => {
          setCoordenadas({ lat: -33.42628, lng: -70.61742 });
          if (!direccion) {
            setDireccion('Av. Providencia 1234');
          }
          setUbicando(false);
        },
        { timeout: 5000 }
      );
    } else {
      setCoordenadas({ lat: -33.42628, lng: -70.61742 });
      setDireccion('Av. Providencia 1234');
      setUbicando(false);
    }
  };

  const handleContinuar = () => {
    if (!direccion.trim()) {
      setError('Ingresa una dirección o usa el botón de geolocalización para continuar.');
      return;
    }
    setError('');
    onContinuar({
      direccion: direccion.trim(),
      comuna,
      referencia: referencia.trim(),
      fecha,
      bloqueHorario,
      coordenadas,
    });
  };

  return (
    <div className="space-y-6">
      {/* Sección HU-04: Dirección por Geolocalización */}
      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              1. Dirección de Toma de Muestra
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Geolocaliza tu domicilio para asignar la ruta de enfermería más cercana.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            HU-04
          </span>
        </div>

        {/* Botón GPS */}
        <button
          type="button"
          onClick={detectarUbicacion}
          disabled={ubicando}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 font-semibold text-sm transition-all disabled:opacity-60"
        >
          <Crosshair className={`w-4 h-4 ${ubicando ? 'animate-spin' : ''}`} />
          {ubicando ? 'Detectando ubicación...' : 'Usar mi ubicación actual (GPS)'}
        </button>

        {coordenadas && (
          <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-lg px-3 py-2">
            <Navigation className="w-4 h-4 shrink-0" />
            <span>
              Coordenadas capturadas:{' '}
              <strong className="font-mono">
                {coordenadas.lat}, {coordenadas.lng}
              </strong>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-sky-200/80 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-300" />
              Calle y Número
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: Av. Providencia 1234"
              className="w-full rounded-xl bg-slate-950/60 border border-cyan-500/25 px-3.5 py-2.5 text-sm text-white placeholder:text-sky-200/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-sky-200/80">
              Comuna
            </label>
            <select
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              className="w-full rounded-xl bg-slate-950/80 border border-cyan-500/25 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {COMUNAS_COBERTURA.map((c) => (
                <option key={c} value={c} className="bg-slate-900">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-sky-200/80">
            Depto / Casa / Referencia (Opcional)
          </label>
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Ej: Depto 402, conserjería torre B"
            className="w-full rounded-xl bg-slate-950/60 border border-cyan-500/25 px-3.5 py-2.5 text-sm text-white placeholder:text-sky-200/40 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </section>

      {/* Sección HU-05: Fecha y Bloque Horario */}
      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              2. Fecha y Bloque Horario
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Selecciona el día y rango horario en que recibirás al profesional.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            HU-05
          </span>
        </div>

        {/* Selector de días */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-200/80 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-300" />
            Día disponible
          </p>
          <div className="grid grid-cols-5 gap-2">
            {diasDisponibles.map((d) => {
              const seleccionado = fecha === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setFecha(d.iso)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all ${
                    seleccionado
                      ? 'bg-cyan-400/20 border-cyan-300 text-white shadow-[0_0_14px_rgba(34,211,238,0.25)]'
                      : 'bg-slate-950/50 border-cyan-500/20 text-sky-200/75 hover:border-cyan-400/40'
                  }`}
                >
                  <span className="text-[11px] uppercase">{d.diaSemana}</span>
                  <span className="text-lg font-bold leading-tight">{d.diaNum}</span>
                  <span className="text-[11px] uppercase opacity-75">{d.mes}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector de bloques */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-200/80 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-300" />
            Bloque horario
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BLOQUES_HORARIOS.map((b) => {
              const seleccionado = bloqueHorario === b.rango;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBloqueHorario(b.rango)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    seleccionado
                      ? 'bg-cyan-400/20 border-cyan-300 text-white shadow-[0_0_14px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-950/50 border-cyan-500/20 text-sky-200/80 hover:border-cyan-400/40'
                  }`}
                >
                  <div>
                    <p className="font-mono font-semibold text-sm">{b.rango}</p>
                    <p className="text-xs text-cyan-300/85">{b.etiqueta}</p>
                  </div>
                  {seleccionado && (
                    <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {error && (
        <p className="text-xs text-rose-300 bg-rose-500/15 border border-rose-400/30 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Navegación */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onVolver}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-sky-200 bg-slate-900/70 border border-cyan-500/25 hover:border-cyan-400/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <button
          type="button"
          onClick={handleContinuar}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)]"
        >
          Ir al Resumen
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}