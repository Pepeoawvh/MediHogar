'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Upload,
  Camera,
  FileCheck2,
  X,
  CheckCircle2,
  FlaskConical,
  Info,
  ArrowRight,
} from 'lucide-react';
import { CATALOGO_EXAMENES } from '@/data/mockCatalogo';
import { useMediHogar } from '@/context/MediHogarContext';

interface Props {
  onContinuar: () => void;
}

export default function BuscadorYOrden({ onContinuar }: Props) {
  const {
    examenesSeleccionados,
    toggleExamen,
    archivoOrden,
    setArchivoOrden,
  } = useMediHogar();

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState<string>('Todas');

  const examenesFiltrados = useMemo(() => {
    return CATALOGO_EXAMENES.filter((ex) => {
      const coincideTexto =
        ex.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        ex.codigoLis.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCat = categoria === 'Todas' || ex.categoria === categoria;
      return coincideTexto && coincideCat;
    });
  }, [busqueda, categoria]);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoOrden(file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sección HU-03: Carga de Orden Médica */}
      <section className="glass-card rounded-2xl p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              1. Orden Médica Digital
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Sube tu receta en PDF, imagen o tómale una foto directa.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            HU-03
          </span>
        </div>

        {archivoOrden ? (
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/40">
            <div className="flex items-center gap-3 min-w-0">
              <FileCheck2 className="w-6 h-6 text-emerald-300 shrink-0" />
              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">{archivoOrden}</p>
                <p className="text-xs text-emerald-300">Orden cargada en memoria local</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setArchivoOrden(null)}
              className="p-2 text-sky-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Quitar archivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2.5 p-4 rounded-xl border border-dashed border-cyan-400/40 bg-sky-950/40 hover:bg-sky-900/50 cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-medium text-sky-100">Subir PDF o Imagen</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleArchivo}
                className="hidden"
              />
            </label>

            <label className="flex items-center justify-center gap-2.5 p-4 rounded-xl border border-dashed border-cyan-400/40 bg-sky-950/40 hover:bg-sky-900/50 cursor-pointer transition-colors">
              <Camera className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-medium text-sky-100">Usar Cámara Móvil</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleArchivo}
                className="hidden"
              />
            </label>
          </div>
        )}
      </section>

      {/* Sección HU-02: Buscador de Exámenes */}
      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              2. Catálogo de Exámenes (LIS)
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Busca y selecciona los exámenes indicados en tu orden.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            HU-02
          </span>
        </div>

        {/* Input de búsqueda */}
        <div className="relative">
          <Search className="w-5 h-5 text-cyan-300/70 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre (ej. Hemograma, Glucosa) o código LIS..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-400/30 text-white placeholder-sky-300/50 focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2">
          {['Todas', 'Sangre', 'Orina', 'Alta Complejidad'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                categoria === cat
                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.45)]'
                  : 'bg-sky-950/60 text-sky-200 border border-cyan-500/25 hover:border-cyan-400/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de resultados */}
        <div className="space-y-2.5">
          {examenesFiltrados.map((examen) => {
            const seleccionado = examenesSeleccionados.some((e) => e.id === examen.id);
            return (
              <button
                key={examen.id}
                type="button"
                onClick={() => toggleExamen(examen)}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-start justify-between gap-4 ${
                  seleccionado
                    ? 'glass-card-active'
                    : 'bg-slate-950/40 border border-cyan-500/15 hover:border-cyan-400/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span className="font-semibold text-white">{examen.nombre}</span>
                  </div>
                  <p className="text-xs font-mono text-cyan-300/80">
                    {examen.codigoLis} · {examen.categoria}
                  </p>
                  <p className="text-xs text-sky-200/75 flex items-center gap-1.5 pt-1">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {examen.preparacion}
                  </p>
                </div>

                <div className="text-right shrink-0 flex flex-col items-end gap-2">
                  <span className="font-bold text-cyan-300">
                    ${examen.precioBase.toLocaleString('es-CL')}
                  </span>
                  <CheckCircle2
                    className={`w-6 h-6 transition-colors ${
                      seleccionado ? 'text-cyan-300 fill-cyan-300/20' : 'text-slate-600'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Barra de acción inferior */}
      <div className="flex items-center justify-between gap-4 glass-card rounded-2xl p-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-sky-300">Seleccionados</p>
          <p className="text-lg font-bold text-white">
            {examenesSeleccionados.length}{' '}
            {examenesSeleccionados.length === 1 ? 'examen' : 'exámenes'}
          </p>
        </div>
        <button
          type="button"
          disabled={examenesSeleccionados.length === 0}
          onClick={onContinuar}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_18px_rgba(34,211,238,0.35)]"
        >
          Continuar a Agenda
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}