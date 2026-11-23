'use client';

import React from 'react';
import { Home, CalendarPlus, FileText, User, Activity, LogOut } from 'lucide-react';
import { useMediHogar } from '@/context/MediHogarContext';
import { VistaApp } from '@/types';

const NAV_ITEMS: { id: VistaApp; label: string; icon: React.ElementType }[] = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'agendar', label: 'Agendar', icon: CalendarPlus },
  { id: 'resultados', label: 'Resultados', icon: FileText },
  { id: 'perfil', label: 'Mi Perfil', icon: User },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { paciente, setPaciente, vistaActiva, setVistaActiva } = useMediHogar();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-slate-200">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200">
          <div className="p-2 bg-sky-600 rounded-lg text-white">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">MediHogar</h1>
            <p className="text-xs text-slate-500">TechMed Clínico</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const activa = vistaActiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setVistaActiva(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activa
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {paciente && (
          <div className="p-4 border-t border-slate-200">
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-900 truncate">{paciente.nombre}</p>
              <p className="text-xs text-slate-500 truncate">{paciente.email}</p>
            </div>
            <button
              onClick={() => setPaciente(null)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </aside>

      {/* Header Móvil */}
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-600 rounded-lg text-white">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900">MediHogar Móvil</span>
        </div>
        {paciente && (
          <button
            onClick={() => setPaciente(null)}
            className="text-xs font-medium text-red-600 px-2 py-1 rounded-md bg-red-50"
          >
            Salir
          </button>
        )}
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 md:pl-64 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto p-4 md:p-8">{children}</div>
      </main>

      {/* Barra Inferior Móvil */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const activa = vistaActiva === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-lg ${
                activa ? 'text-sky-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}