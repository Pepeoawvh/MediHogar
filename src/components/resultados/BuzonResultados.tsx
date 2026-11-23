'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  ExternalLink,
  ShieldCheck,
  Calendar,
  UserCheck,
  Search,
  FlaskConical,
} from 'lucide-react';

interface ResultadoClinico {
  id: string;
  codigoOrden: string;
  nombreExamen: string;
  fechaValidacion: string;
  profesionalValidador: string;
  estado: 'VALIDADO' | 'EN_PROCESO';
  archivoUrl: string;
  nombreDescarga: string;
}

const RESULTADOS_MOCK: ResultadoClinico[] = [
  {
    id: 'res-01',
    codigoOrden: 'LIS-2026-8841',
    nombreExamen: 'Hemograma Completo + Perfil Bioquímico',
    fechaValidacion: '20 Nov 2026 · 14:35',
    profesionalValidador: 'TM. Carolina Méndez (Reg. Minsal #44120)',
    estado: 'VALIDADO',
    archivoUrl: '/resultados/resultado-demo.pdf',
    nombreDescarga: 'MediHogar_Hemograma_LIS-2026-8841.pdf',
  },
  {
    id: 'res-02',
    codigoOrden: 'LIS-2026-8502',
    nombreExamen: 'Perfil Lipídico y Glucosa en Ayunas',
    fechaValidacion: '04 Nov 2026 · 11:10',
    profesionalValidador: 'TM. Rodrigo Salazar (Reg. Minsal #39814)',
    estado: 'VALIDADO',
    archivoUrl: '/resultados/resultado-demo.pdf',
    nombreDescarga: 'MediHogar_PerfilLipidico_LIS-2026-8502.pdf',
  },
  {
    id: 'res-03',
    codigoOrden: 'LIS-2026-8990',
    nombreExamen: 'Perfil Tiroideo (TSH, T4 Libre)',
    fechaValidacion: 'Pendiente de validación',
    profesionalValidador: 'Laboratorio Central TechMed',
    estado: 'EN_PROCESO',
    archivoUrl: '',
    nombreDescarga: '',
  },
];

export default function BuzonResultados() {
  const [filtro, setFiltro] = useState('');

  const resultadosFiltrados = RESULTADOS_MOCK.filter(
    (r) =>
      r.nombreExamen.toLowerCase().includes(filtro.toLowerCase()) ||
      r.codigoOrden.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Encabezado del Buzón */}
      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              Buzón de Resultados Clínicos
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Informes firmados digitalmente y disponibles para descarga en PDF.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shrink-0">
            HU-29
          </span>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="w-5 h-5 text-cyan-300/70 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Filtrar por examen o código LIS..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-400/30 text-white placeholder-sky-300/50 focus:outline-none focus:border-cyan-300"
          />
        </div>

        {/* Lista de Resultados */}
        <div className="space-y-3">
          {resultadosFiltrados.map((res) => {
            const estaValidado = res.estado === 'VALIDADO';

            return (
              <div
                key={res.id}
                className={`p-4 rounded-xl border transition-all ${
                  estaValidado
                    ? 'bg-slate-950/50 border-cyan-500/25 hover:border-cyan-400/50'
                    : 'bg-slate-950/30 border-slate-700/40 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <FlaskConical className="w-4 h-4 text-cyan-300 shrink-0" />
                      <h3 className="font-semibold text-white text-sm md:text-base">
                        {res.nombreExamen}
                      </h3>
                      {estaValidado ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/35">
                          <FileCheck2 className="w-3 h-3" /> Validado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/35">
                          En análisis
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono text-cyan-300/80">
                      Orden: {res.codigoOrden}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sky-200/75 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {res.fechaValidacion}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                        {res.profesionalValidador}
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción PDF */}
                  {estaValidado ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={res.archivoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-cyan-200 bg-sky-950/70 border border-cyan-400/35 hover:bg-sky-900/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver
                      </a>

                      <a
                        href={res.archivoUrl}
                        download={res.nombreDescarga}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_14px_rgba(34,211,238,0.3)]"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      Disponible pronto
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota de seguridad */}
        <div className="flex items-center gap-2 text-xs text-sky-200/70 bg-sky-950/50 border border-cyan-500/20 rounded-xl p-3">
          <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>
            Todos los documentos cuentan con firma electrónica avanzada y respaldo en historial clínico.
          </span>
        </div>
      </section>
    </div>
  );
}