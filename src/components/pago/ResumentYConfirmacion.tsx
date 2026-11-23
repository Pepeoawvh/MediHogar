'use client';

import React, { useState } from 'react';
import {
  Receipt,
  ShieldCheck,
  CreditCard,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowLeft,
  MailCheck,
  Loader2,
} from 'lucide-react';
import { useMediHogar } from '@/context/MediHogarContext';
import { COBERTURA_PREVISION } from '@/data/mockCatalogo';
import { DatosAgenda } from '@/components/agenda/Agendamiento';
import { Cita } from '@/types';

interface Props {
  datosAgenda: DatosAgenda;
  onVolver: () => void;
  onFinalizar: () => void;
}

export default function ResumenYConfirmacion({
  datosAgenda,
  onVolver,
  onFinalizar,
}: Props) {
  const {
    paciente,
    examenesSeleccionados,
    archivoOrden,
    agregarCita,
    limpiarBorrador,
  } = useMediHogar();

  const [procesando, setProcesando] = useState(false);
  const [citaConfirmada, setCitaConfirmada] = useState<Cita | null>(null);

  const previsionKey = paciente?.prevision || 'PARTICULAR';
  const infoPrevision = COBERTURA_PREVISION[previsionKey];

  const subtotal = examenesSeleccionados.reduce((acc, ex) => acc + ex.precioBase, 0);
  const descuentoPrevision = Math.round(subtotal * infoPrevision.descuento);
  const totalCopago = subtotal - descuentoPrevision;

  const handleConfirmarPago = () => {
    setProcesando(true);

    setTimeout(() => {
      const codigoTransaccion = `TM-${Math.floor(100000 + Math.random() * 900000)}`;
      const nuevaCita: Cita = {
        id: `cita-${Date.now()}`,
        fecha: datosAgenda.fecha,
        bloqueHorario: datosAgenda.bloqueHorario,
        direccion: datosAgenda.referencia
          ? `${datosAgenda.direccion}, ${datosAgenda.referencia}`
          : datosAgenda.direccion,
        comuna: datosAgenda.comuna,
        archivoOrdenNombre: archivoOrden || undefined,
        examenes: [...examenesSeleccionados],
        subtotal,
        descuentoPrevision,
        totalCopago,
        estado: 'PAGADA',
        codigoTransaccion,
      };

      agregarCita(nuevaCita);
      limpiarBorrador();
      setCitaConfirmada(nuevaCita);
      setProcesando(false);
    }, 1100);
  };

  if (citaConfirmada) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-9 h-9 text-emerald-300" />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
            HU-17 · RESERVA CONFIRMADA
          </span>
          <h2 className="text-2xl font-bold text-white pt-2">
            ¡Tu toma de muestra está agendada!
          </h2>
          <p className="text-sm text-sky-200/80">
            Código de transacción:{' '}
            <strong className="font-mono text-cyan-300">
              {citaConfirmada.codigoTransaccion}
            </strong>
          </p>
        </div>

        <div className="text-left bg-slate-950/55 border border-cyan-500/25 rounded-xl p-4 space-y-2.5 text-sm">
          <p className="flex items-center gap-2 text-sky-100">
            <Calendar className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>
              <strong>{citaConfirmada.fecha}</strong> · {citaConfirmada.bloqueHorario}
            </span>
          </p>
          <p className="flex items-center gap-2 text-sky-100">
            <MapPin className="w-4 h-4 text-cyan-300 shrink-0" />
            <span>
              {citaConfirmada.direccion}, {citaConfirmada.comuna}
            </span>
          </p>
          <p className="flex items-center gap-2 text-emerald-300 text-xs pt-1 border-t border-cyan-500/15">
            <MailCheck className="w-4 h-4 shrink-0" />
            <span>
              Comprobante e indicaciones de ayuno enviados a{' '}
              <strong>{paciente?.email}</strong>
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onFinalizar}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_18px_rgba(34,211,238,0.35)]"
        >
          Ir a mi Panel Principal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              1. Resumen de Visita Domiciliaria
            </h2>
            <p className="text-xs text-sky-200/75 mt-0.5">
              Verifica tu dirección y horario antes de confirmar.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            HU-20
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-cyan-500/20">
            <p className="text-xs uppercase tracking-wider text-sky-300/80 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-300" /> Fecha y Bloque
            </p>
            <p className="font-semibold text-white">{datosAgenda.fecha}</p>
            <p className="text-xs text-cyan-300">{datosAgenda.bloqueHorario}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-cyan-500/20">
            <p className="text-xs uppercase tracking-wider text-sky-300/80 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-300" /> Domicilio
            </p>
            <p className="font-semibold text-white truncate">{datosAgenda.direccion}</p>
            <p className="text-xs text-cyan-300">{datosAgenda.comuna}</p>
          </div>
        </div>

        {archivoOrden && (
          <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-lg px-3 py-2">
            <FileText className="w-4 h-4 shrink-0" />
            <span>Orden médica adjunta: {archivoOrden}</span>
          </div>
        )}
      </section>

      <section className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-cyan-300" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-300">
            2. Presupuesto Detallado ({infoPrevision.label})
          </h2>
        </div>

        <div className="divide-y divide-cyan-500/15">
          {examenesSeleccionados.map((ex) => (
            <div key={ex.id} className="py-2.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-white">{ex.nombre}</p>
                <p className="text-xs font-mono text-sky-300/70">{ex.codigoLis}</p>
              </div>
              <span className="font-mono text-sky-100">
                ${ex.precioBase.toLocaleString('es-CL')}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-cyan-400/25 space-y-2 text-sm">
          <div className="flex justify-between text-sky-200/85">
            <span>Subtotal exámenes</span>
            <span className="font-mono">${subtotal.toLocaleString('es-CL')}</span>
          </div>

          <div className="flex justify-between text-emerald-300">
            <span>
              Bonificación {infoPrevision.label} ({Math.round(infoPrevision.descuento * 100)}%)
            </span>
            <span className="font-mono">
              - ${descuentoPrevision.toLocaleString('es-CL')}
            </span>
          </div>

          <div className="flex justify-between items-baseline pt-3 border-t border-cyan-400/30">
            <span className="font-bold uppercase tracking-wider text-white">
              Total Copago a Pagar
            </span>
            <span className="text-2xl font-bold font-mono text-cyan-300">
              ${totalCopago.toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-sky-200/75 bg-sky-950/60 border border-cyan-500/20 rounded-xl p-3">
          <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>
            Transacción protegida con cifrado de extremo a extremo (Simulación Webpay).
          </span>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onVolver}
          disabled={procesando}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-sky-200 bg-slate-900/70 border border-cyan-500/25 hover:border-cyan-400/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <button
          type="button"
          onClick={handleConfirmarPago}
          disabled={procesando}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-70 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        >
          {procesando ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando pago...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Confirmar y Pagar
            </>
          )}
        </button>
      </div>
    </div>
  );
}