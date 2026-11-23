'use client';

import React, { useState } from 'react';
import {
  Activity,
  CalendarPlus,
  FileCheck2,
  Home,
  LogOut,
  User,
  Calendar,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useMediHogar } from '@/context/MediHogarContext';
import BuscadorYOrden from '@/components/orden/BuscadorYOrden';
import Agendamiento, { DatosAgenda } from '@/components/agenda/Agendamiento';
import ResumenYConfirmacion from '@/components/pago/ResumentYConfirmacion';
import BuzonResultados from '@/components/resultados/BuzonResultados';

type VistaActiva = 'inicio' | 'agendar' | 'resultados';
type PasoReserva = 1 | 2 | 3;

export default function MediHogarApp() {
  const { paciente, setPaciente, citas } = useMediHogar();

  // Estado de navegación
  const [vista, setVista] = useState<VistaActiva>('inicio');
  const [pasoReserva, setPasoReserva] = useState<PasoReserva>(1);
  const [datosAgenda, setDatosAgenda] = useState<DatosAgenda | null>(null);

  // Estado del formulario de acceso rápido (HU-01)
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [prevision, setPrevision] = useState<'FONASA' | 'ISAPRE' | 'PARTICULAR'>('FONASA');

  const handleIngreso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !rut.trim() || !email.trim()) return;
    setPaciente({
      nombre: nombre.trim(),
      rut: rut.trim(),
      email: email.trim(),
      prevision,
    });
  };

  const iniciarNuevaReserva = () => {
    setPasoReserva(1);
    setDatosAgenda(null);
    setVista('agendar');
  };

  // Pantalla de Acceso / Registro (HU-01) si no hay paciente en sesión
  if (!paciente) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              <Activity className="w-8 h-8 text-cyan-300" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-cyan-300">
              MediHogar
            </h1>
            <p className="text-[11px] uppercase tracking-[0.35em] text-sky-200/70">
              TechMed Domiciliario
            </p>
          </div>

          <form onSubmit={handleIngreso} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-sky-200 mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Camila Rojas"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-400/30 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sky-200 mb-1.5">
                  RUT
                </label>
                <input
                  type="text"
                  required
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  placeholder="18.456.789-0"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-400/30 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sky-200 mb-1.5">
                  Previsión
                </label>
                <select
                  value={prevision}
                  onChange={(e) =>
                    setPrevision(e.target.value as 'FONASA' | 'ISAPRE' | 'PARTICULAR')
                  }
                  className="w-full px-3 py-3 rounded-xl bg-slate-950/80 border border-cyan-400/30 text-white focus:outline-none focus:border-cyan-300"
                >
                  <option value="FONASA" className="bg-slate-900">Fonasa</option>
                  <option value="ISAPRE" className="bg-slate-900">Isapre</option>
                  <option value="PARTICULAR" className="bg-slate-900">Particular</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-sky-200 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="camila@correo.cl"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-400/30 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              Ingresar al Portal
            </button>
          </form>

          <p className="text-[11px] text-center text-sky-200/60 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
            Conexión cifrada · Datos protegidos
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior */}
      <header className="sticky top-0 z-30 glass-card border-x-0 border-t-0 rounded-none">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setVista('inicio')}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="p-1.5 rounded-lg bg-cyan-400/15 border border-cyan-400/40">
              <Activity className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <span className="block text-sm font-bold uppercase tracking-widest text-cyan-300 leading-none">
                MediHogar
              </span>
              <span className="block text-[9px] uppercase tracking-[0.28em] text-sky-200/70 mt-0.5">
                TechMed
              </span>
            </div>
          </button>

          {/* Navegación principal */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setVista('inicio')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                vista === 'inicio'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-sky-200 hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            <button
              type="button"
              onClick={iniciarNuevaReserva}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                vista === 'agendar'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-sky-200 hover:bg-white/5'
              }`}
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Agendar</span>
            </button>

            <button
              type="button"
              onClick={() => setVista('resultados')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                vista === 'resultados'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-sky-200 hover:bg-white/5'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span className="hidden sm:inline">Resultados</span>
            </button>

            <button
              type="button"
              onClick={() => setPaciente(null)}
              title="Cerrar sesión"
              className="p-2 rounded-xl text-sky-300/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 md:py-8">
        {/* VISTA 1: PANEL PRINCIPAL */}
        {vista === 'inicio' && (
          <div className="space-y-6">
            {/* Saludo y perfil */}
            <section className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-300">
                    Paciente Verificado
                  </p>
                  <h1 className="text-xl font-bold text-white">{paciente.nombre}</h1>
                  <p className="text-xs font-mono text-sky-200/75">
                    {paciente.rut} · {paciente.prevision}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={iniciarNuevaReserva}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              >
                <CalendarPlus className="w-4 h-4" />
                Nueva Toma de Muestra
              </button>
            </section>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={iniciarNuevaReserva}
                className="glass-card rounded-2xl p-5 text-left hover:border-cyan-300/60 transition-all group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    Agendar a Domicilio
                  </span>
                  <p className="text-sm text-sky-100/80">
                    Sube tu orden médica, elige exámenes y coordina el horario.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => setVista('resultados')}
                className="glass-card rounded-2xl p-5 text-left hover:border-cyan-300/60 transition-all group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    Buzón de Resultados
                  </span>
                  <p className="text-sm text-sky-100/80">
                    Revisa y descarga tus informes clínicos validados en PDF.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>

            {/* Próximas Citas */}
            <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
                Mis Citas Agendadas ({citas.length})
              </h2>

              {citas.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-slate-950/40 border border-dashed border-cyan-500/25">
                  <p className="text-sm text-sky-200/75">
                    Aún no tienes visitas domiciliarias programadas.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {citas.map((cita) => (
                    <div
                      key={cita.id}
                      className="p-4 rounded-xl bg-slate-950/55 border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                            {cita.estado}
                          </span>
                          <span className="text-xs font-mono text-cyan-300">
                            {cita.codigoTransaccion}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-cyan-300" />
                          {cita.fecha} · {cita.bloqueHorario}
                        </p>
                        <p className="text-xs text-sky-200/80 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {cita.direccion}, {cita.comuna}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs text-sky-300/75">
                          {cita.examenes.length} exámenes
                        </p>
                        <p className="text-lg font-bold font-mono text-cyan-300">
                          ${cita.totalCopago.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* VISTA 2: FLUJO DE AGENDAMIENTO (3 PASOS) */}
        {vista === 'agendar' && (
          <div className="space-y-6">
            {/* Indicador de pasos */}
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              {[
                { num: 1, label: 'Exámenes' },
                { num: 2, label: 'Dirección y Hora' },
                { num: 3, label: 'Presupuesto' },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`flex items-center gap-2 ${
                    pasoReserva >= step.num ? 'text-cyan-300' : 'text-sky-200/40'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs ${
                      pasoReserva >= step.num
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-sky-300/50'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
              ))}
            </div>

            {pasoReserva === 1 && (
              <BuscadorYOrden onContinuar={() => setPasoReserva(2)} />
            )}

            {pasoReserva === 2 && (
              <Agendamiento
                onVolver={() => setPasoReserva(1)}
                onContinuar={(datos) => {
                  setDatosAgenda(datos);
                  setPasoReserva(3);
                }}
              />
            )}

            {pasoReserva === 3 && datosAgenda && (
              <ResumenYConfirmacion
                datosAgenda={datosAgenda}
                onVolver={() => setPasoReserva(2)}
                onFinalizar={() => {
                  setPasoReserva(1);
                  setDatosAgenda(null);
                  setVista('inicio');
                }}
              />
            )}
          </div>
        )}

        {/* VISTA 3: BUZÓN DE RESULTADOS */}
        {vista === 'resultados' && <BuzonResultados />}
      </main>
    </div>
  );
}