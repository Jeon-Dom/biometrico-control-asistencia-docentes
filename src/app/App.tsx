import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard, Radio, FileText, Users, Calendar, Monitor,
  FileCheck, Settings, LogOut, RefreshCw, Search, Plus, Edit,
  Trash2, Download, Eye, CheckCircle, X, Fingerprint,
  Server, Activity, Database, Shield, ChevronDown,
  Clock, XCircle, Wifi, Upload, Save, Terminal,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Teacher {
  id: string; ccuv: string; firstName: string; lastName: string;
  department: string; email: string; active: boolean; avatar: string;
}
interface Marking {
  id: string; employeeId: string; firstName: string; lastName: string;
  date: string; time: string;
  type: "Entrada" | "Salida" | "Entrada Hora Extra" | "Salida Hora Extra";
  status: "A Tiempo" | "Atraso" | "Falta"; avatar: string;
}
interface Justification {
  id: string; teacherName: string; employeeId: string;
  dateAbsence: string; timeAbsence: string; reason: string;
  file: string; status: "Pendiente" | "Aprobado" | "Rechazado";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TEACHERS: Teacher[] = [
  { id:"1", ccuv:"DOC-001", firstName:"Ana Lucía", lastName:"García Mendoza", department:"Ciencias Exactas", email:"a.garcia@universidad.edu.ec", active:true, avatar:"AG" },
  { id:"2", ccuv:"DOC-002", firstName:"Carlos Andrés", lastName:"Mendoza Parra", department:"Ingeniería y TI", email:"c.mendoza@universidad.edu.ec", active:true, avatar:"CM" },
  { id:"3", ccuv:"DOC-003", firstName:"María José", lastName:"Rodríguez Vega", department:"Humanidades", email:"m.rodriguez@universidad.edu.ec", active:true, avatar:"MR" },
  { id:"4", ccuv:"DOC-004", firstName:"Pedro Ramón", lastName:"Suárez Torres", department:"Ciencias Sociales", email:"p.suarez@universidad.edu.ec", active:true, avatar:"PS" },
  { id:"5", ccuv:"DOC-005", firstName:"Laura Patricia", lastName:"Jiménez Castro", department:"Ciencias de la Salud", email:"l.jimenez@universidad.edu.ec", active:true, avatar:"LJ" },
  { id:"6", ccuv:"DOC-006", firstName:"Roberto Luis", lastName:"Vargas Ochoa", department:"Ingeniería y TI", email:"r.vargas@universidad.edu.ec", active:false, avatar:"RV" },
  { id:"7", ccuv:"DOC-007", firstName:"Diana Fernanda", lastName:"Morales Quispe", department:"Ciencias Exactas", email:"d.morales@universidad.edu.ec", active:true, avatar:"DM" },
  { id:"8", ccuv:"DOC-008", firstName:"Héctor Manuel", lastName:"Flores Aguilar", department:"Educación", email:"h.flores@universidad.edu.ec", active:true, avatar:"HF" },
  { id:"9", ccuv:"DOC-009", firstName:"Sofía Elena", lastName:"Paredes Loza", department:"Artes y Diseño", email:"s.paredes@universidad.edu.ec", active:true, avatar:"SP" },
  { id:"10", ccuv:"DOC-010", firstName:"Miguel Ángel", lastName:"Torres Bravo", department:"Ciencias Sociales", email:"m.torres@universidad.edu.ec", active:true, avatar:"MT" },
];

const MARKINGS_BASE: Marking[] = [
  { id:"m1",  employeeId:"DOC-001", firstName:"Ana Lucía",    lastName:"García Mendoza",  date:"07/08/2026", time:"07:58:23", type:"Entrada",            status:"A Tiempo", avatar:"AG" },
  { id:"m2",  employeeId:"DOC-002", firstName:"Carlos Andrés",lastName:"Mendoza Parra",   date:"07/08/2026", time:"08:14:07", type:"Entrada",            status:"Atraso",   avatar:"CM" },
  { id:"m3",  employeeId:"DOC-003", firstName:"María José",   lastName:"Rodríguez Vega",  date:"07/08/2026", time:"07:55:44", type:"Entrada",            status:"A Tiempo", avatar:"MR" },
  { id:"m4",  employeeId:"DOC-004", firstName:"Pedro Ramón",  lastName:"Suárez Torres",   date:"07/08/2026", time:"08:02:11", type:"Entrada",            status:"A Tiempo", avatar:"PS" },
  { id:"m5",  employeeId:"DOC-005", firstName:"Laura Patricia",lastName:"Jiménez Castro",  date:"07/08/2026", time:"08:21:33", type:"Entrada",            status:"Atraso",   avatar:"LJ" },
  { id:"m6",  employeeId:"DOC-007", firstName:"Diana Fernanda",lastName:"Morales Quispe",  date:"07/08/2026", time:"07:59:58", type:"Entrada",            status:"A Tiempo", avatar:"DM" },
  { id:"m7",  employeeId:"DOC-008", firstName:"Héctor Manuel", lastName:"Flores Aguilar",  date:"07/08/2026", time:"12:01:22", type:"Salida",             status:"A Tiempo", avatar:"HF" },
  { id:"m8",  employeeId:"DOC-001", firstName:"Ana Lucía",    lastName:"García Mendoza",  date:"07/08/2026", time:"12:00:05", type:"Salida",             status:"A Tiempo", avatar:"AG" },
  { id:"m9",  employeeId:"DOC-009", firstName:"Sofía Elena",  lastName:"Paredes Loza",    date:"07/08/2026", time:"08:35:12", type:"Entrada",            status:"Atraso",   avatar:"SP" },
  { id:"m10", employeeId:"DOC-010", firstName:"Miguel Ángel", lastName:"Torres Bravo",    date:"07/08/2026", time:"14:00:01", type:"Entrada Hora Extra", status:"A Tiempo", avatar:"MT" },
  { id:"m11", employeeId:"DOC-002", firstName:"Carlos Andrés",lastName:"Mendoza Parra",   date:"07/08/2026", time:"12:05:44", type:"Salida",             status:"A Tiempo", avatar:"CM" },
  { id:"m12", employeeId:"DOC-003", firstName:"María José",   lastName:"Rodríguez Vega",  date:"07/08/2026", time:"12:00:00", type:"Salida",             status:"A Tiempo", avatar:"MR" },
];

const MARKINGS_DAY2: Marking[] = MARKINGS_BASE.map(m => ({
  ...m, id: m.id + "b", date: "06/08/2026",
  time: m.time.replace(/(\d{2}):(\d{2}):(\d{2})/, (_, h, min, s) => `${h}:${String(Number(min) + 2).padStart(2,"0")}:${s}`),
}));

const ALL_MARKINGS = [...MARKINGS_BASE, ...MARKINGS_DAY2];

const JUSTIFICATIONS: Justification[] = [
  { id:"j1", teacherName:"Carlos Andrés Mendoza Parra", employeeId:"DOC-002", dateAbsence:"06/08/2026", timeAbsence:"08:00", reason:"Cita Médica",           file:"certificado_medico_mendoza.pdf",   status:"Pendiente" },
  { id:"j2", teacherName:"Roberto Luis Vargas Ochoa",   employeeId:"DOC-006", dateAbsence:"05/08/2026", timeAbsence:"08:00", reason:"Enfermedad Personal",   file:"reposo_medico_vargas.pdf",         status:"Aprobado"  },
  { id:"j3", teacherName:"Laura Patricia Jiménez Castro",employeeId:"DOC-005", dateAbsence:"04/08/2026", timeAbsence:"08:21", reason:"Trámite Institucional", file:"oficio_comision_jimenez.pdf",      status:"Pendiente" },
  { id:"j4", teacherName:"Héctor Manuel Flores Aguilar", employeeId:"DOC-008", dateAbsence:"01/08/2026", timeAbsence:"08:00", reason:"Calamidad Doméstica",  file:"declaracion_flores.pdf",           status:"Rechazado" },
  { id:"j5", teacherName:"Sofía Elena Paredes Loza",    employeeId:"DOC-009", dateAbsence:"31/07/2026", timeAbsence:"08:00", reason:"Cita Médica",           file:"certificado_paredes.pdf",          status:"Aprobado"  },
];

const CHART_DATA = [
  { day:"Lun", Asistencias:112, Atrasos:6,  Faltas:2  },
  { day:"Mar", Asistencias:108, Atrasos:9,  Faltas:3  },
  { day:"Mié", Asistencias:95,  Atrasos:14, Faltas:11 },
  { day:"Jue", Asistencias:117, Atrasos:3,  Faltas:0  },
  { day:"Vie", Asistencias:95,  Atrasos:8,  Faltas:4  },
];

const LOG_LINES = [
  { ts:"08:00:01", svc:"bio-cache",  st:"OK",   msg:"Cache inicializado. Registros: 120 docentes cargados en memoria." },
  { ts:"08:00:02", svc:"bio-server", st:"OK",   msg:"Servidor BioTime escuchando en 0.0.0.0:8085" },
  { ts:"08:00:03", svc:"bio-apache0",st:"OK",   msg:"Apache2 activo. PID 2847. Workers: 4/8 ocupados." },
  { ts:"08:00:04", svc:"bio-proxy",  st:"OK",   msg:"Proxy inverso configurado → 127.0.0.1:8085" },
  { ts:"08:00:05", svc:"bio-db",     st:"OK",   msg:"PostgreSQL conectado. HOST:127.0.0.1 DB:biotime1 PORT:7496" },
  { ts:"08:01:13", svc:"zklink",     st:"OK",   msg:"Terminal A (192.168.1.200) en línea. Firmware: ZEM800-v2.4.7" },
  { ts:"08:01:15", svc:"zklink",     st:"OK",   msg:"Terminal B (192.168.1.201) en línea. Firmware: ZEM800-v2.4.7" },
  { ts:"08:03:22", svc:"sync",       st:"OK",   msg:"Sincronización completa. 14 marcaciones importadas desde Terminal A." },
  { ts:"08:05:11", svc:"sync",       st:"OK",   msg:"Sincronización completa. 9 marcaciones importadas desde Terminal B." },
  { ts:"08:14:07", svc:"bio-server", st:"WARN", msg:"Latencia elevada: DOC-002 procesado en 234ms (umbral: 200ms)." },
  { ts:"08:21:33", svc:"bio-server", st:"OK",   msg:"Marcación registrada: DOC-005 — Entrada — 08:21:33" },
  { ts:"08:35:12", svc:"bio-server", st:"OK",   msg:"Marcación registrada: DOC-009 — Entrada — 08:35:12" },
  { ts:"09:00:00", svc:"bio-cache",  st:"OK",   msg:"Caché actualizado. Próxima sincronización automática en 60 min." },
  { ts:"09:00:01", svc:"heartbeat",  st:"OK",   msg:"Todos los servicios operativos. Uptime: 01:00:00" },
  { ts:"10:00:01", svc:"heartbeat",  st:"OK",   msg:"Todos los servicios operativos. Uptime: 02:00:00" },
  { ts:"11:00:01", svc:"heartbeat",  st:"OK",   msg:"Todos los servicios operativos. Uptime: 03:00:00" },
];

// ─── Schedule Data ────────────────────────────────────────────────────────────
const HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
const DAYS  = ["Lunes","Martes","Miércoles","Jueves","Viernes"];

type Block = { teacher: string; subject: string; room: string; color: string };
const BLOCKS: Record<string, Block> = {
  "Lunes-07:00":     { teacher:"García, A.",   subject:"Cálculo I",       room:"Aula 301",   color:"bg-indigo-100 border-l-2 border-indigo-400 text-indigo-900" },
  "Lunes-09:00":     { teacher:"Mendoza, C.",  subject:"Prog. Web",       room:"Lab-TI-02",  color:"bg-violet-100 border-l-2 border-violet-400 text-violet-900" },
  "Lunes-11:00":     { teacher:"Rodríguez, M.",subject:"Historia Univ.",  room:"Aula 105",   color:"bg-rose-100 border-l-2 border-rose-400 text-rose-900" },
  "Lunes-14:00":     { teacher:"Flores, H.",   subject:"Pedagogía I",     room:"Aula 108",   color:"bg-orange-100 border-l-2 border-orange-400 text-orange-900" },
  "Martes-07:00":    { teacher:"Suárez, P.",   subject:"Sociología",      room:"Aula 210",   color:"bg-amber-100 border-l-2 border-amber-400 text-amber-900" },
  "Martes-09:00":    { teacher:"Jiménez, L.",  subject:"Anatomía I",      room:"Lab-Salud",  color:"bg-emerald-100 border-l-2 border-emerald-400 text-emerald-900" },
  "Martes-11:00":    { teacher:"García, A.",   subject:"Cálculo II",      room:"Aula 302",   color:"bg-indigo-100 border-l-2 border-indigo-400 text-indigo-900" },
  "Martes-14:00":    { teacher:"Morales, D.",  subject:"Álgebra Lineal",  room:"Aula 303",   color:"bg-teal-100 border-l-2 border-teal-400 text-teal-900" },
  "Miércoles-08:00": { teacher:"Vargas, R.",   subject:"Redes I",         room:"Lab-TI-01",  color:"bg-cyan-100 border-l-2 border-cyan-400 text-cyan-900" },
  "Miércoles-10:00": { teacher:"Morales, D.",  subject:"Estadística",     room:"Aula 303",   color:"bg-teal-100 border-l-2 border-teal-400 text-teal-900" },
  "Miércoles-14:00": { teacher:"Flores, H.",   subject:"Currículo",       room:"Aula 108",   color:"bg-orange-100 border-l-2 border-orange-400 text-orange-900" },
  "Jueves-07:00":    { teacher:"Paredes, S.",  subject:"Diseño 3D",       room:"Lab-Arte",   color:"bg-pink-100 border-l-2 border-pink-400 text-pink-900" },
  "Jueves-09:00":    { teacher:"Torres, M.",   subject:"Derecho Civil",   room:"Aula 201",   color:"bg-slate-100 border-l-2 border-slate-400 text-slate-900" },
  "Jueves-11:00":    { teacher:"Mendoza, C.",  subject:"DevOps",          room:"Lab-TI-02",  color:"bg-violet-100 border-l-2 border-violet-400 text-violet-900" },
  "Jueves-14:00":    { teacher:"Jiménez, L.",  subject:"Farmacología",    room:"Lab-Salud",  color:"bg-emerald-100 border-l-2 border-emerald-400 text-emerald-900" },
  "Viernes-07:00":   { teacher:"García, A.",   subject:"Análisis Mat.",   room:"Aula 301",   color:"bg-indigo-100 border-l-2 border-indigo-400 text-indigo-900" },
  "Viernes-09:00":   { teacher:"Suárez, P.",   subject:"Metodología",     room:"Aula 211",   color:"bg-amber-100 border-l-2 border-amber-400 text-amber-900" },
  "Viernes-11:00":   { teacher:"Vargas, R.",   subject:"Seguridad Inf.",  room:"Lab-TI-01",  color:"bg-cyan-100 border-l-2 border-cyan-400 text-cyan-900" },
  "Viernes-14:00":   { teacher:"Morales, D.",  subject:"Geometría",       room:"Aula 304",   color:"bg-teal-100 border-l-2 border-teal-400 text-teal-900" },
};

// ─── Shared UI Components ─────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-indigo-500","bg-emerald-500","bg-violet-500",
  "bg-cyan-600","bg-rose-500","bg-amber-500","bg-blue-500","bg-teal-600",
];

function Av({ ini, size = "md" }: { ini: string; size?: "sm"|"md"|"lg" }) {
  const sz = size === "sm" ? "w-7 h-7 text-[10px]" : size === "lg" ? "w-11 h-11 text-base" : "w-9 h-9 text-xs";
  const col = AVATAR_COLORS[(ini.charCodeAt(0) + (ini.charCodeAt(1) || 0)) % AVATAR_COLORS.length];
  return (
    <div className={`${sz} ${col} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {ini}
    </div>
  );
}

const BADGE_MAP: Record<string, string> = {
  "A Tiempo":         "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Atraso":           "bg-amber-100  text-amber-700  border border-amber-200",
  "Falta":            "bg-red-100   text-red-700    border border-red-200",
  "Entrada":          "bg-blue-100  text-blue-700   border border-blue-200",
  "Salida":           "bg-slate-100 text-slate-600  border border-slate-200",
  "Entrada Hora Extra":"bg-purple-100 text-purple-700 border border-purple-200",
  "Salida Hora Extra": "bg-pink-100  text-pink-700   border border-pink-200",
  "Pendiente":        "bg-amber-100 text-amber-700  border border-amber-200",
  "Aprobado":         "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Rechazado":        "bg-red-100   text-red-700    border border-red-200",
  "Activo":           "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "Inactivo":         "bg-slate-100 text-slate-500  border border-slate-200",
};

function Badge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${BADGE_MAP[label] ?? "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      {label}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50">
      {children}
    </th>
  );
}

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-[15px] font-semibold text-slate-800">{title}</h2>
      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [form, setForm] = useState({ user: "", pass: "", role: "admin" });
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1a2744] to-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header band */}
          <div className="bg-[#4F46E5] px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900 opacity-60" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                  <Fingerprint className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg leading-snug">Control de Asistencia</div>
                  <div className="text-indigo-200 text-sm font-medium">ZKTeco BioTime System</div>
                </div>
              </div>
              <p className="text-indigo-200 text-xs mt-1">Sistema Integrado de Gestión Docente — v2.4</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="px-8 py-7 space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Usuario / Correo Institucional</label>
              <input
                type="text"
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
                placeholder="admin@universidad.edu.ec"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5] bg-slate-50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={form.pass}
                onChange={(e) => setForm({ ...form, pass: e.target.value })}
                placeholder="••••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5] bg-slate-50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Rol de Acceso</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 focus:border-[#4F46E5] bg-slate-50"
              >
                <option value="admin">Administrador / Talento Humano</option>
                <option value="docente">Docente</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all text-sm shadow-lg shadow-indigo-300/40 mt-2"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="px-8 pb-6 text-center">
            <p className="text-[10px] text-slate-400 font-mono">
              BioTime :8085  •  PostgreSQL :7496  •  JWT Auth
            </p>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-slate-500 text-xs mt-4">
          Demo: cualquier usuario / contraseña para acceder
        </p>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",      label:"Dashboard",             icon:LayoutDashboard },
  { id:"live",           label:"Marcaciones en Vivo",   icon:Radio            },
  { id:"report",         label:"Reporte de Marcaciones",icon:FileText         },
  { id:"teachers",       label:"Gestión de Docentes",   icon:Users            },
  { id:"devices",        label:"Dispositivos ZKTeco",   icon:Monitor          },
  { id:"schedules",      label:"Horarios y Mallas",     icon:Calendar         },
  { id:"justifications", label:"Justificaciones",       icon:FileCheck        },
  { id:"settings",       label:"Configuración",         icon:Settings         },
];

function Sidebar({ page, nav, logout }: { page: string; nav: (p: string) => void; logout: () => void }) {
  return (
    <div className="w-[232px] flex-shrink-0 bg-[#0F172A] flex flex-col h-full select-none">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-[#4F46E5] p-2 rounded-lg flex-shrink-0">
            <Fingerprint className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
          </div>
          <div>
            <div className="text-white font-bold text-[13px] leading-tight">ZKTeco BioTime</div>
            <div className="text-slate-500 text-[10px]">Control Docente v2.4</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => nav(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-[12px] font-medium ${
                active
                  ? "bg-[#4F46E5] text-white shadow-lg shadow-indigo-900/50"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
              {id === "live" && (
                <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              )}
              {id === "justifications" && (
                <span className="ml-auto bg-amber-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AD</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[11px] font-semibold truncate">Admin Sistemas</div>
            <div className="text-slate-500 text-[10px] truncate">Talento Humano</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-[12px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [syncing, setSyncing] = useState(false);
  const sync = () => { setSyncing(true); setTimeout(() => setSyncing(false), 2200); };
  return (
    <header className="h-13 min-h-[52px] bg-white border-b border-slate-200 flex items-center px-5 gap-3 flex-shrink-0">
      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-semibold text-slate-800 truncate">Sistema de Control de Asistencia Docente</span>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-700 font-mono">BioTime :8085 ONLINE</span>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
          <Database className="w-3 h-3 text-blue-600" />
          <span className="text-[10px] font-semibold text-blue-700 font-mono">PostgreSQL :7496 Conectado</span>
        </div>
        <button
          onClick={sync}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Sincronizando…" : "Sincronizar BioTime"}
        </button>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="w-6 h-6 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-[10px] font-bold">AD</div>
          <div>
            <div className="text-[11px] font-semibold text-slate-700 leading-tight">Administrador</div>
            <div className="text-[10px] text-slate-400 leading-tight">Talento Humano</div>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, Icon, iconBg, valColor }: {
  label: string; value: string | number; sub?: string;
  Icon: React.ElementType; iconBg: string; valColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${valColor}`}>{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <div className={`p-2.5 rounded-xl flex-shrink-0 ${iconBg}`}>
        <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-3">
        <KpiCard label="Docentes Activos"    value={120}   sub="Total registrados"      Icon={Users}        iconBg="bg-indigo-100"  valColor="text-indigo-600" />
        <KpiCard label="Asistencias Hoy"     value={95}    sub="Vie 07/08/2026"         Icon={CheckCircle}  iconBg="bg-emerald-100" valColor="text-emerald-600" />
        <KpiCard label="Atrasos Registrados" value={8}     sub="Hoy"                    Icon={Clock}        iconBg="bg-amber-100"   valColor="text-amber-600" />
        <KpiCard label="Faltas del Día"      value={4}     sub="Sin justificar: 2"      Icon={XCircle}      iconBg="bg-red-100"     valColor="text-red-600" />
        <KpiCard label="Dispositivos ZKTeco" value="2 / 2" sub="Todos conectados"       Icon={Wifi}         iconBg="bg-blue-100"    valColor="text-blue-600" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Realtime table */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-800">Marcaciones en Tiempo Real</h2>
              <p className="text-[10px] text-slate-400">Últimas marcaciones — Hoy 07/08/2026</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-600 font-semibold">En vivo</span>
            </div>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <Th>Docente</Th><Th>ID/CCUV</Th><Th>Fecha</Th><Th>Hora</Th><Th>Tipo</Th><Th>Estado</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MARKINGS_BASE.map((m) => (
                  <tr key={m.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Av ini={m.avatar} size="sm" />
                        <span className="font-medium text-slate-700 text-[11px]">{m.firstName} {m.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-mono text-indigo-600 text-[11px] font-semibold">{m.employeeId}</td>
                    <td className="px-4 py-2 text-slate-500 text-[11px]">{m.date}</td>
                    <td className="px-4 py-2 font-mono font-bold text-slate-700 text-[11px]">{m.time}</td>
                    <td className="px-4 py-2"><Badge label={m.type} /></td>
                    <td className="px-4 py-2"><Badge label={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13px] font-semibold text-slate-800">Tendencia Semanal</h2>
          <p className="text-[10px] text-slate-400 mb-4">Semana actual — Agosto 2026</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={CHART_DATA} barCategoryGap="30%" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{ border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                cursor={{ fill: "#F8FAFC" }}
              />
              <Bar dataKey="Asistencias" fill="#4F46E5" radius={[3,3,0,0]} />
              <Bar dataKey="Atrasos"     fill="#F59E0B" radius={[3,3,0,0]} />
              <Bar dataKey="Faltas"      fill="#EF4444" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {[["#4F46E5","Asistencias"],["#F59E0B","Atrasos"],["#EF4444","Faltas"]].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2 rounded-[2px]" style={{ background: color }} />
                <span className="text-[10px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Top tardanzas */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-[12px] font-semibold text-slate-700 mb-3">Top Atrasos — Semana</h3>
          <div className="space-y-2">
            {[
              { name:"Jiménez Castro, L.", days:3, color:"bg-red-400" },
              { name:"Mendoza Parra, C.",  days:2, color:"bg-amber-400" },
              { name:"Paredes Loza, S.",   days:2, color:"bg-amber-400" },
              { name:"Suárez Torres, P.",  days:1, color:"bg-yellow-300" },
            ].map(row => (
              <div key={row.name} className="flex items-center gap-3">
                <span className="text-[11px] text-slate-600 flex-1 truncate">{row.name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5 max-w-[80px]">
                  <div className={`${row.color} h-1.5 rounded-full`} style={{ width: `${(row.days/3)*100}%` }} />
                </div>
                <span className="text-[10px] font-semibold text-slate-500 w-6 text-right">{row.days}d</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device pulse */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-[12px] font-semibold text-slate-700 mb-3">Estado de Terminales</h3>
          <div className="space-y-3">
            {[
              { name:"Terminal A — Acceso Principal", ip:"192.168.1.200", ok:true, last:"09:00:00" },
              { name:"Terminal B — Acceso Secundario", ip:"192.168.1.201", ok:true, last:"08:55:12" },
            ].map(d => (
              <div key={d.ip} className="flex items-center gap-3 border border-slate-100 rounded-lg px-3 py-2.5">
                <Fingerprint className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-slate-700 truncate">{d.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{d.ip} · Sinc: {d.last}</div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${d.ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${d.ok ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  {d.ok ? "OK" : "ERROR"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-[12px] font-semibold text-slate-700 mb-3">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label:"Exportar CSV Hoy",  Icon:Download, color:"bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200" },
              { label:"Ver Justificaciones",Icon:FileCheck, color:"bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200" },
              { label:"Agregar Docente",   Icon:Plus,     color:"bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" },
              { label:"Probar BioTime",    Icon:Activity,  color:"bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200" },
            ].map(a => (
              <button key={a.label} className={`flex flex-col items-center gap-1.5 border rounded-lg p-3 transition-colors ${a.color}`}>
                <a.Icon className="w-4 h-4" />
                <span className="text-[10px] font-medium text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Live Markings ────────────────────────────────────────────────────────────
function LiveMarkings() {
  const [search, setSearch] = useState("");
  const [device, setDevice] = useState("Todos");
  const now = new Date().toLocaleTimeString("es-EC");

  const filtered = MARKINGS_BASE.filter(m =>
    !search || `${m.firstName} ${m.lastName} ${m.employeeId}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Marcaciones en Vivo"
          sub={`Actualizando cada 5 s · Terminal A (192.168.1.200) | Terminal B (192.168.1.201) · ${now}`}
        />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-700">Transmisión en vivo</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { l:"Presentes Ahora",   v:"95",  bg:"bg-emerald-50 border-emerald-200", tc:"text-emerald-600" },
          { l:"Con Atraso",        v:"8",   bg:"bg-amber-50 border-amber-200",     tc:"text-amber-600" },
          { l:"Ausentes",          v:"4",   bg:"bg-red-50 border-red-200",         tc:"text-red-600" },
          { l:"No Marcaron Aún",   v:"13",  bg:"bg-slate-50 border-slate-200",     tc:"text-slate-500" },
        ].map(s => (
          <div key={s.l} className={`border rounded-xl px-4 py-3 text-center ${s.bg}`}>
            <div className={`text-2xl font-bold ${s.tc}`}>{s.v}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar docente o ID…"
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 bg-white"
            />
          </div>
          <select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 bg-white"
          >
            <option>Todos los dispositivos</option>
            <option>Terminal A — 192.168.1.200</option>
            <option>Terminal B — 192.168.1.201</option>
          </select>
          <span className="text-[10px] text-slate-400 ml-auto">{filtered.length} registros</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100">
              <Th>Foto</Th><Th>Nombres</Th><Th>Apellidos</Th><Th>ID / CCUV</Th><Th>Fecha</Th><Th>Hora</Th><Th>Tipo de Marcación</Th><Th>Estado</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-indigo-50/20 transition-colors">
                <td className="px-4 py-2.5"><Av ini={m.avatar} size="sm" /></td>
                <td className="px-4 py-2.5 font-semibold text-slate-700">{m.firstName}</td>
                <td className="px-4 py-2.5 text-slate-600">{m.lastName}</td>
                <td className="px-4 py-2.5 font-mono text-indigo-600 font-semibold">{m.employeeId}</td>
                <td className="px-4 py-2.5 text-slate-500">{m.date}</td>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-800">{m.time}</td>
                <td className="px-4 py-2.5"><Badge label={m.type} /></td>
                <td className="px-4 py-2.5"><Badge label={m.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Attendance Report ────────────────────────────────────────────────────────
function AttendanceReport() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("2026-08-01");
  const [dateTo,   setDateTo]   = useState("2026-08-07");
  const [typeF,    setTypeF]    = useState("Todos");
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 8;

  const filtered = ALL_MARKINGS.filter(m => {
    const q = search.toLowerCase();
    return (
      (!search || `${m.firstName} ${m.lastName} ${m.employeeId}`.toLowerCase().includes(q)) &&
      (typeF === "Todos" || m.type === typeF)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Reporte de Marcaciones"
          sub="Estructura compatible con exportación CSV de BioTime"
        />
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
          <button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por ID o nombre…"
            className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Desde:</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Hasta:</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30" />
        </div>
        <select
          value={typeF}
          onChange={(e) => { setTypeF(e.target.value); setPage(1); }}
          className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
        >
          <option value="Todos">Todos los tipos</option>
          <option>Entrada</option>
          <option>Salida</option>
          <option>Entrada Hora Extra</option>
          <option>Salida Hora Extra</option>
        </select>
        <span className="text-[10px] text-slate-400 ml-auto">{filtered.length} registros</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100">
              <Th>Id del Empleado</Th><Th>Nombres</Th><Th>Apellidos</Th>
              <Th>Fecha</Th><Th>Hora</Th><Th>Tipo de Marcación</Th><Th>Estado</Th><Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-mono text-indigo-600 font-semibold">{m.employeeId}</td>
                <td className="px-4 py-2.5 font-semibold text-slate-700">{m.firstName}</td>
                <td className="px-4 py-2.5 text-slate-600">{m.lastName}</td>
                <td className="px-4 py-2.5 text-slate-500">{m.date}</td>
                <td className="px-4 py-2.5 font-mono font-bold text-slate-800">{m.time}</td>
                <td className="px-4 py-2.5"><Badge label={m.type} /></td>
                <td className="px-4 py-2.5"><Badge label={m.status} /></td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors font-semibold border border-indigo-100">
                      <Eye className="w-3 h-3" />Ver
                    </button>
                    <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors font-semibold border border-amber-100">
                      <FileCheck className="w-3 h-3" />Justificar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Mostrando {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} de {filtered.length} registros
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={page===1}
              className="px-2.5 py-1 text-[10px] border border-slate-200 rounded-md disabled:opacity-40 hover:bg-white transition-colors font-medium"
            >Anterior</button>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 text-[10px] rounded-md font-semibold transition-colors ${p===page ? "bg-[#4F46E5] text-white" : "border border-slate-200 hover:bg-white text-slate-600"}`}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p+1))}
              disabled={page===totalPages}
              className="px-2.5 py-1 text-[10px] border border-slate-200 rounded-md disabled:opacity-40 hover:bg-white transition-colors font-medium"
            >Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Teacher Management ───────────────────────────────────────────────────────
const DEPTS = ["Ciencias Exactas","Ingeniería y TI","Humanidades","Ciencias Sociales","Ciencias de la Salud","Educación","Artes y Diseño"];

function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(TEACHERS);
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(false);
  const [target,   setTarget]   = useState<Teacher | null>(null);
  const [form,     setForm]     = useState({ ccuv:"", firstName:"", lastName:"", department:"", email:"", active:true });

  const openAdd = () => {
    setTarget(null);
    setForm({ ccuv:"", firstName:"", lastName:"", department:"", email:"", active:true });
    setModal(true);
  };
  const openEdit = (t: Teacher) => {
    setTarget(t);
    setForm({ ccuv:t.ccuv, firstName:t.firstName, lastName:t.lastName, department:t.department, email:t.email, active:t.active });
    setModal(true);
  };
  const handleSave = () => {
    const ini = ((form.firstName[0] ?? "") + (form.lastName[0] ?? "")).toUpperCase();
    if (target) {
      setTeachers(prev => prev.map(t => t.id===target.id ? { ...t, ...form, avatar:ini } : t));
    } else {
      setTeachers(prev => [...prev, { id:String(Date.now()), ...form, avatar:ini }]);
    }
    setModal(false);
  };
  const handleDelete = (id: string) => setTeachers(prev => prev.filter(t => t.id!==id));

  const filtered = teachers.filter(t =>
    !search || `${t.firstName} ${t.lastName} ${t.ccuv} ${t.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Gestión de Docentes"
          sub={`Directorio completo — ${teachers.filter(t=>t.active).length} activos de ${teachers.length} registrados`}
        />
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white text-[11px] font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar Nuevo Docente
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, ID o correo…"
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 bg-white"
            />
          </div>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100">
              <Th>Foto</Th><Th>ID / CCUV</Th><Th>Nombres y Apellidos</Th>
              <Th>Departamento / Facultad</Th><Th>Correo Institucional</Th><Th>Estado</Th><Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><Av ini={t.avatar} size="md" /></td>
                <td className="px-4 py-3 font-mono text-indigo-600 font-semibold">{t.ccuv}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-800">{t.firstName}</div>
                  <div className="text-slate-400 text-[10px]">{t.lastName}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{t.department}</td>
                <td className="px-4 py-3 text-slate-500">{t.email}</td>
                <td className="px-4 py-3"><Badge label={t.active ? "Activo" : "Inactivo"} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEdit(t)}
                      className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 transition-colors font-semibold"
                    >
                      <Edit className="w-3 h-3" />Editar
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-colors font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-slate-800">{target ? "Editar Docente" : "Registrar Nuevo Docente"}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Complete todos los campos requeridos</p>
              </div>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">ID / CCUV *</label>
                  <input value={form.ccuv} onChange={(e) => setForm({...form,ccuv:e.target.value})}
                    placeholder="DOC-011"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Departamento *</label>
                  <select value={form.department} onChange={(e) => setForm({...form,department:e.target.value})}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30">
                    <option value="">Seleccionar…</option>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Nombres *</label>
                  <input value={form.firstName} onChange={(e) => setForm({...form,firstName:e.target.value})}
                    placeholder="María José"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Apellidos *</label>
                  <input value={form.lastName} onChange={(e) => setForm({...form,lastName:e.target.value})}
                    placeholder="García Mendoza"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Correo Institucional *</label>
                <input value={form.email} onChange={(e) => setForm({...form,email:e.target.value})}
                  placeholder="m.garcia@universidad.edu.ec"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">Estado:</span>
                <button
                  type="button"
                  onClick={() => setForm({...form,active:!form.active})}
                  className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${form.active ? "bg-emerald-500" : "bg-slate-300"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-xs text-slate-500">{form.active ? "Activo" : "Inactivo"}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end gap-2">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-[11px] font-semibold border border-slate-200 rounded-lg hover:bg-white transition-colors text-slate-600">
                Cancelar
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-[11px] font-semibold bg-[#4F46E5] text-white rounded-lg hover:bg-indigo-700 transition-colors">
                {target ? "Guardar Cambios" : "Registrar Docente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Schedule View ────────────────────────────────────────────────────────────
function ScheduleView() {
  const [grace, setGrace] = useState(10);
  const [teacher, setTeacher] = useState("Todos");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Horarios y Mallas Curriculares" sub="Distribución semanal de clases y horarios laborales por docente" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium">Tolerancia:</span>
            <input
              type="number"
              value={grace}
              onChange={(e) => setGrace(Number(e.target.value))}
              min={0} max={30}
              className="w-10 text-center border-0 outline-none font-bold text-[#4F46E5] bg-transparent"
            />
            <span className="text-slate-400">min</span>
          </div>
          <button className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white text-[11px] font-semibold px-4 py-2.5 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Asignar Nuevo Horario
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 px-5 py-3 flex items-center gap-3 flex-wrap">
        <Users className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-600">Filtrar por docente:</span>
        <select
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
        >
          <option>Todos</option>
          {TEACHERS.map(t => <option key={t.id}>{t.firstName} {t.lastName}</option>)}
        </select>
        <div className="ml-auto flex flex-wrap gap-3">
          {[
            ["bg-indigo-300","Ciencias Exactas"],["bg-violet-300","Ing. y TI"],
            ["bg-emerald-300","Salud"],["bg-rose-300","Humanidades"],["bg-amber-300","Sociales"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-2.5 rounded-sm ${color}`} />
              <span className="text-[10px] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-auto">
        <table className="w-full text-xs min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 w-16 sticky left-0 z-10">Hora</th>
              {DAYS.map(d => (
                <th key={d} className="px-3 py-3 text-center text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-50 border-l border-slate-100 min-w-[140px]">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour, hi) => (
              <tr key={hour} className={hi % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                <td className="px-4 py-1.5 font-mono text-slate-400 text-[10px] font-semibold border-r border-slate-100 bg-slate-50 sticky left-0 z-10 align-top pt-2">{hour}</td>
                {DAYS.map(day => {
                  const block = BLOCKS[`${day}-${hour}`];
                  return (
                    <td key={day} className="px-1.5 py-1.5 border-l border-slate-100 h-12 align-top">
                      {block && (
                        <div className={`${block.color} rounded-md px-2 py-1.5 cursor-pointer hover:shadow-md transition-shadow h-full`}>
                          <div className="font-bold text-[11px] leading-tight truncate">{block.subject}</div>
                          <div className="text-[9px] opacity-70 truncate mt-0.5">{block.teacher} · {block.room}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { day:"Lunes",     count:4, hours:"14h" },
          { day:"Martes",    count:4, hours:"14h" },
          { day:"Miércoles", count:3, hours:"10h" },
          { day:"Jueves",    count:4, hours:"12h" },
          { day:"Viernes",   count:4, hours:"12h" },
        ].map(d => (
          <div key={d.day} className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{d.day}</div>
            <div className="text-lg font-bold text-[#4F46E5] mt-0.5">{d.count}</div>
            <div className="text-[10px] text-slate-500">clases · {d.hours}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ZKTeco Devices ───────────────────────────────────────────────────────────
function ZKTecoDevices() {
  const [logs,    setLogs]    = useState(LOG_LINES);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  const addLog = (entry: typeof LOG_LINES[0]) =>
    setLogs(prev => [...prev, entry]);

  const handleSync = () => {
    setSyncing(true);
    const ts = new Date().toLocaleTimeString("es-EC");
    addLog({ ts, svc:"sync", st:"OK", msg:"Sincronización manual iniciada. Contactando Terminal A y B…" });
    setTimeout(() => {
      const ts2 = new Date().toLocaleTimeString("es-EC");
      addLog({ ts:ts2, svc:"sync", st:"OK", msg:"Terminal A: 3 nuevas marcaciones importadas correctamente." });
      addLog({ ts:ts2, svc:"sync", st:"OK", msg:"Terminal B: 1 nueva marcación importada correctamente." });
      addLog({ ts:ts2, svc:"sync", st:"OK", msg:"Sincronización finalizada. Base de datos actualizada." });
      setSyncing(false);
    }, 2200);
  };

  const handleTest = () => {
    setTesting(true);
    addLog({ ts: new Date().toLocaleTimeString("es-EC"), svc:"test", st:"OK", msg:"Iniciando prueba de conexión Puerto 8085…" });
    setTimeout(() => {
      addLog({ ts: new Date().toLocaleTimeString("es-EC"), svc:"test", st:"OK", msg:"Puerto 8085 ACCESIBLE. Latencia: 12ms. Auth: JWT. TLS: desactivado." });
      setTesting(false);
    }, 1500);
  };

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  const SVC_COLOR: Record<string, string> = {
    "bio-cache": "text-cyan-400", "bio-server": "text-indigo-400",
    "bio-apache0": "text-violet-400", "bio-proxy": "text-blue-400",
    "bio-db": "text-teal-400", "zklink": "text-emerald-400",
    "sync": "text-yellow-400", "heartbeat": "text-slate-500",
    "test": "text-pink-400",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Dispositivos ZKTeco y BioTime" sub="Panel de monitoreo de terminales biométricas en tiempo real" />
        <div className="flex items-center gap-2">
          <button onClick={handleTest} disabled={testing}
            className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors disabled:opacity-60">
            <Activity className={`w-3.5 h-3.5 ${testing ? "animate-pulse text-amber-500" : ""}`} />
            {testing ? "Probando…" : "Probar Conexión :8085"}
          </button>
          <button className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors">
            <Users className="w-3.5 h-3.5" />
            Sincronizar Usuarios CCUV
          </button>
          <button onClick={handleSync} disabled={syncing}
            className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors disabled:opacity-60">
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Sincronizando…" : "Forzar Sincronización"}
          </button>
        </div>
      </div>

      {/* Device cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name:"Terminal A — Acceso Principal",  ip:"192.168.1.200", loc:"Edificio Central — Planta Baja",    sn:"ZEM800-A1F9X2", fw:"2.4.7", users:120 },
          { name:"Terminal B — Acceso Secundario", ip:"192.168.1.201", loc:"Edificio Académico — Piso 1",       sn:"ZEM800-B3K7Y8", fw:"2.4.7", users:120 },
        ].map(d => (
          <div key={d.ip} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[13px] font-bold text-slate-800">{d.name}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{d.loc}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-700">Conectado</span>
              </div>
            </div>

            {/* Device visual */}
            <div className="bg-slate-800 rounded-xl p-4 mb-4 flex items-center gap-4">
              <div className="w-16 h-20 bg-gradient-to-b from-slate-700 to-slate-900 rounded-xl flex flex-col items-center justify-center border border-slate-600 gap-2">
                <Fingerprint className="w-7 h-7 text-slate-300" />
                <div className="w-8 h-1 bg-slate-600 rounded" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-white">ZKTeco SpeedFace V5L</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">S/N: {d.sn}</div>
                <div className="text-[10px] text-slate-400 font-mono">FW: v{d.fw}</div>
                <div className="text-[10px] text-slate-400 font-mono">IP: {d.ip}:4370</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-semibold">En línea — Operativo</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { l:"Dirección IP",           v:d.ip },
                { l:"Puerto BioTime",         v:"8085" },
                { l:"Usuarios registrados",   v:`${d.users} docentes` },
                { l:"Última sincronización",  v:"Hoy 09:00:00" },
                { l:"Capacidad de huellas",   v:"3,000 plantillas" },
                { l:"Uptime dispositivo",     v:"99.8 %" },
              ].map(item => (
                <div key={item.l} className="bg-slate-50 rounded-lg px-3 py-2">
                  <div className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">{item.l}</div>
                  <div className="font-mono font-bold text-slate-700 text-[11px] mt-0.5">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Console */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-[12px] font-bold text-slate-100">BioTime Service Console</span>
            <span className="text-[10px] text-slate-500 font-mono">— servidor@biotime:~</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div ref={consoleRef} className="bg-[#0A0F1E] h-64 overflow-y-auto p-4 font-mono text-[11px] space-y-0.5">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 leading-relaxed">
              <span className="text-slate-600 flex-shrink-0 w-[68px]">[{log.ts}]</span>
              <span className={`flex-shrink-0 w-[80px] font-bold ${SVC_COLOR[log.svc] ?? "text-slate-400"}`}>{log.svc}</span>
              <span className={`flex-shrink-0 w-[36px] font-bold ${log.st==="OK" ? "text-emerald-400" : log.st==="WARN" ? "text-amber-400" : "text-red-400"}`}>{log.st}</span>
              <span className="text-slate-300">{log.msg}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400">biotime@server:~$</span>
            <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Justifications ───────────────────────────────────────────────────────────
function Justifications() {
  const [rows,    setRows]    = useState<Justification[]>(JUSTIFICATIONS);
  const [modal,   setModal]   = useState(false);
  const [sel,     setSel]     = useState<Justification | null>(null);
  const [reason,  setReason]  = useState("");

  const openModal = (j: Justification) => { setSel(j); setReason(j.reason); setModal(true); };
  const decide = (status: "Aprobado" | "Rechazado") => {
    if (!sel) return;
    setRows(prev => prev.map(j => j.id===sel.id ? { ...j, status } : j));
    setModal(false);
  };

  const counts = { Pendiente: rows.filter(j=>j.status==="Pendiente").length, Aprobado: rows.filter(j=>j.status==="Aprobado").length, Rechazado: rows.filter(j=>j.status==="Rechazado").length };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Módulo de Justificaciones" sub="Gestión y resolución de inasistencias y atrasos" />
        <div className="flex items-center gap-2">
          {[
            { l:"Pendientes", v:counts.Pendiente, cls:"bg-amber-100 text-amber-700 border-amber-200" },
            { l:"Aprobadas",  v:counts.Aprobado,  cls:"bg-emerald-100 text-emerald-700 border-emerald-200" },
            { l:"Rechazadas", v:counts.Rechazado, cls:"bg-red-100 text-red-700 border-red-200" },
          ].map(s => (
            <div key={s.l} className={`border rounded-full px-3 py-1 text-[11px] font-bold ${s.cls}`}>
              {s.v} {s.l}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100">
              <Th>Docente</Th><Th>ID / CCUV</Th><Th>Fecha Inasistencia</Th><Th>Hora</Th>
              <Th>Motivo</Th><Th>Archivo Adjunto</Th><Th>Estado</Th><Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((j) => (
              <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Av ini={j.teacherName.split(" ").slice(0,2).map(n=>n[0]).join("")} size="sm" />
                    <span className="font-semibold text-slate-700">{j.teacherName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-indigo-600 font-semibold">{j.employeeId}</td>
                <td className="px-4 py-3 text-slate-600">{j.dateAbsence}</td>
                <td className="px-4 py-3 font-mono text-slate-700 font-semibold">{j.timeAbsence}</td>
                <td className="px-4 py-3 text-slate-600">{j.reason}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-indigo-600 cursor-pointer hover:text-indigo-800">
                    <FileCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate max-w-[140px] text-[10px]">{j.file}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge label={j.status} /></td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openModal(j)}
                    className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 transition-colors font-semibold"
                  >
                    <Eye className="w-3 h-3" />Revisar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && sel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-slate-800">Revisar Justificación</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{sel.teacherName} — {sel.dateAbsence} {sel.timeAbsence}</p>
              </div>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l:"Docente",            v:sel.teacherName },
                  { l:"ID / CCUV",          v:sel.employeeId  },
                  { l:"Fecha y Hora",        v:`${sel.dateAbsence} ${sel.timeAbsence}` },
                  { l:"Estado Actual",       v:null, badge:sel.status },
                ].map(item => (
                  <div key={item.l} className="bg-slate-50 rounded-lg px-3 py-2.5">
                    <div className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">{item.l}</div>
                    {item.badge
                      ? <div className="mt-1"><Badge label={item.badge} /></div>
                      : <div className="text-[11px] font-semibold text-slate-700 mt-0.5">{item.v}</div>
                    }
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Motivo de Justificación</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Documento de Respaldo</label>
                <div className="flex items-center gap-3 border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50">
                  <FileCheck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span className="text-[11px] text-indigo-600 flex-1 font-medium truncate">{sel.file}</span>
                  <button className="text-[11px] text-indigo-600 font-semibold hover:underline flex-shrink-0">Ver PDF</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Nuevo Comprobante (opcional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl px-4 py-4 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-[11px] text-slate-400">Arrastrar o hacer click para subir PDF</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Máx. 5 MB</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end gap-2">
              <button
                onClick={() => decide("Rechazado")}
                className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />Rechazar
              </button>
              <button
                onClick={() => decide("Aprobado")}
                className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />Aprobar y Actualizar Marcación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Configuration ────────────────────────────────────────────────────────────
function ConfigSettings() {
  const [c, setC] = useState({
    tolerance: 10, maxAbsences: 3, syncInterval: 60,
    notifyEmail: "talento.humano@universidad.edu.ec",
    biotimeHost: "127.0.0.1", biotimePort: 8085,
    pgHost: "127.0.0.1", pgPort: 7496, pgDb: "biotime1",
    pgUser: "postgres", pgPass: "••••••••",
    jwtSecret: "••••••••••••••••••••••••••", jwtExpiry: "8h",
  });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const F = ({ label, field, type = "text", unit }: { label: string; field: keyof typeof c; type?: string; unit?: string }) => (
    <div>
      <label className="block text-[10px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={c[field]}
          onChange={(e) => setC(p => ({ ...p, [field]: type==="number" ? Number(e.target.value) : e.target.value }))}
          className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 font-mono"
        />
        {unit && <span className="text-xs text-slate-400 flex-shrink-0 font-medium">{unit}</span>}
      </div>
    </div>
  );

  const Section = ({ icon: Icon, title, status, children }: {
    icon: React.ElementType; title: string; status?: string; children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#4F46E5]" />
        <h3 className="text-[13px] font-semibold text-slate-700 flex-1">{title}</h3>
        {status && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-600 font-semibold">{status}</span>
          </div>
        )}
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <SectionHeader title="Configuración del Sistema" sub="Parámetros de red, base de datos, control de asistencia y seguridad JWT" />
        <button
          onClick={save}
          className={`flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2.5 rounded-lg transition-all ${saved ? "bg-emerald-500 text-white" : "bg-[#4F46E5] hover:bg-indigo-700 text-white"}`}
        >
          {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saved ? "Cambios guardados" : "Guardar Cambios"}
        </button>
      </div>

      <Section icon={Clock} title="Parámetros de Control de Asistencia">
        <div className="grid grid-cols-2 gap-4">
          <F label="Tolerancia de Atraso"               field="tolerance"     type="number" unit="min" />
          <F label="Máx. Ausencias sin Justificar"       field="maxAbsences"   type="number" unit="días" />
          <F label="Intervalo de Sincronización"         field="syncInterval"  type="number" unit="min" />
          <F label="Email de Notificaciones"             field="notifyEmail" />
        </div>
      </Section>

      <Section icon={Server} title="Configuración BioTime" status="ONLINE">
        <div className="grid grid-cols-2 gap-4">
          <F label="Host BioTime"       field="biotimeHost" />
          <F label="Puerto HTTP"        field="biotimePort" type="number" unit="Puerto" />
        </div>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <div>
            <div className="text-[11px] font-semibold text-emerald-700">Servicio BioTime Activo</div>
            <div className="text-[10px] text-emerald-600 font-mono">bio-cache OK · bio-server OK · bio-apache0 OK · bio-proxy OK</div>
          </div>
        </div>
      </Section>

      <Section icon={Database} title="Conexión PostgreSQL" status="Conectado">
        <div className="grid grid-cols-2 gap-4">
          <F label="HOST"      field="pgHost" />
          <F label="PORT"      field="pgPort"  type="number" />
          <F label="DB NAME"   field="pgDb" />
          <F label="USER"      field="pgUser" />
          <div className="col-span-2">
            <F label="PASSWORD" field="pgPass"  type="password" />
          </div>
        </div>
        <div className="mt-4">
          <button className="text-[11px] font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3.5 py-1.5 transition-colors">
            Probar Conexión a DB
          </button>
        </div>
      </Section>

      <Section icon={Shield} title="Seguridad y Gestión de Roles JWT">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <F label="JWT Secret Key"        field="jwtSecret" type="password" />
          <F label="Expiración del Token"  field="jwtExpiry" unit="horas" />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-slate-600 mb-2 uppercase tracking-wide">Roles del Sistema</label>
          <div className="space-y-2">
            {[
              { role:"Administrador / Talento Humano", perms:"Acceso total — CRUD, Reportes, Configuración, Justificaciones, Dispositivos", border:"border-indigo-200 bg-indigo-50" },
              { role:"Docente", perms:"Solo lectura — Ver propias marcaciones, solicitar justificaciones", border:"border-slate-200 bg-slate-50" },
            ].map(r => (
              <div key={r.role} className={`border rounded-lg px-4 py-3 flex items-center justify-between ${r.border}`}>
                <div>
                  <div className="text-[11px] font-bold text-slate-800">{r.role}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{r.perms}</div>
                </div>
                <button className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex-shrink-0 ml-4">
                  Editar permisos
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page,     setPage]     = useState("dashboard");

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <Dashboard />;
      case "live":           return <LiveMarkings />;
      case "report":         return <AttendanceReport />;
      case "teachers":       return <TeacherManagement />;
      case "devices":        return <ZKTecoDevices />;
      case "schedules":      return <ScheduleView />;
      case "justifications": return <Justifications />;
      case "settings":       return <ConfigSettings />;
      default:               return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F8FAFC" }}>
      <Sidebar page={page} nav={setPage} logout={() => setLoggedIn(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-5">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
