'use client';

import React, { useState } from 'react';
import { Activity, Mail, User, Phone, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { useMediHogar } from '@/context/MediHogarContext';
import { COBERTURA_PREVISION } from '@/data/mockCatalogo';
import { Prevision } from '@/types';

export default function RegistroPaciente() {
  const { setPaciente, setVistaActiva } = useMediHogar();

  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [prevision, setPrevision] = useState<Prevision>('FONASA');
  const [error, setError] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const autocompletarDemo = () => {
    setNombre('María González Soto');
    setRut('14.582.910-4');
    setEmail('maria.gonzalez@correo.cl');
    setTelefono('+56 9 8765 4321');
    setPrevision('FONASA');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !rut.trim() || !email.includes('@') || !telefono.trim()) {
      setError('Por favor completa todos los campos con un correo electrónico válido.');
      return;
    }

    setError('');
    setConfirmado(true);

    // Simula el envío de confirmación de credenciales al correo y accede a la app
    setTimeout(() => {
      setPaciente({
        nombre: nombre.trim(),
        rut: rut.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        prevision,
      });
      setVistaActiva('inicio');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-3 bg-sky-600 rounded-2xl text-white mb-3">
            <Activity className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">MediHogar Móvil</h1>
          <p className="text-sm text-slate-600 mt-1">
            Laboratorio Clínico TechMed — Registro de Paciente
          </p>
        </div>

        {confirmado ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="font-bold text-emerald-900 text-lg">¡Registro completado!</h2>
            <p className="text-sm text-emerald-800">
              Enviamos tus credenciales de confirmación a <strong>{email}</strong>. Ingresando a tu panel...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={autocompletarDemo}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Autocompletar datos de prueba (Demo)
            </button>

            {error && (
              <div
                role="alert"
                className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-slate-800 mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. María González Soto"
                  className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="rut" className="block text-sm font-semibold text-slate-800 mb-1">
                RUT
              </label>
              <div className="relative">
                <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  id="rut"
                  type="text"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  placeholder="Ej. 12.345.678-9"
                  className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.cl"
                  className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-semibold text-slate-800 mb-1">
                Teléfono móvil
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  id="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prevision" className="block text-sm font-semibold text-slate-800 mb-1">
                Previsión de salud
              </label>
              <select
                id="prevision"
                value={prevision}
                onChange={(e) => setPrevision(e.target.value as Prevision)}
                className="w-full px-4 py-3 text-base bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {Object.entries(COBERTURA_PREVISION).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-base rounded-xl transition-colors shadow-sm"
            >
              Crear cuenta e ingresar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}