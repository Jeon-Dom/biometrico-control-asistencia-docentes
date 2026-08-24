import React from 'react';

export default function DocenteDashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar del Docente */}
      <aside className="w-64 bg-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6 text-purple-400">Panel Docente v2.4</h1>
          <nav className="space-y-3">
            <a href="#" className="block py-2.5 px-4 rounded bg-purple-600 text-white">Mi Asistencia</a>
            <a href="#" className="block py-2.5 px-4 rounded hover:bg-slate-700 text-gray-300">Mis Horarios</a>
            <a href="#" className="block py-2.5 px-4 rounded hover:bg-slate-700 text-gray-300">Justificaciones</a>
          </nav>
        </div>
        <div>
          <a href="/" className="block py-2.5 px-4 rounded bg-red-600 text-center text-white font-semibold">Cerrar Sesión</a>
        </div>
      </aside>

      {/* Contenido Principal del Docente */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-xl">
          <h2 className="text-2xl font-semibold">Bienvenido, Docente</h2>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Estado: Activo</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Mis Marcaciones Recientes</h3>
            <p className="text-sm text-gray-400">Aquí puedes ver el registro de tus entradas y salidas biométricas.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Horarios Asignados</h3>
            <p className="text-sm text-gray-400">Revisa tus clases y mallas correspondientes al periodo actual.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
