"use client";

import React, { useCallback, useId, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Minus, Sun, Moon, Shield } from "lucide-react";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

type DiasCobertura = "toda_semana" | "lunes_viernes" | "fin_semana";
type Jornada = "24h" | "12h";
type Turno = "dia" | "noche";

export interface QuickPuesto {
  id: string;
  dias: DiasCobertura;
  jornada: Jornada;
  turno: Turno;
  cantidad: number;
}

export interface DotacionApiItem {
  puesto: string;
  cantidad: number;
  dias: string[];
  horaInicio: string;
  horaFin: string;
}

export interface DotacionQuickBuilderProps {
  puestos: QuickPuesto[];
  onChange: (puestos: QuickPuesto[]) => void;
  onSwitchToManual: () => void;
}

// ═══════════════════════════════════════════
// CONSTANTS & HELPERS
// ═══════════════════════════════════════════

const DIAS_MAP: Record<DiasCobertura, string[]> = {
  toda_semana: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
  lunes_viernes: ["lunes", "martes", "miercoles", "jueves", "viernes"],
  fin_semana: ["sabado", "domingo"],
};

const HORARIO_MAP = {
  "24h": { horaInicio: "00:00", horaFin: "00:00" },
  "12h_dia": { horaInicio: "08:00", horaFin: "20:00" },
  "12h_noche": { horaInicio: "20:00", horaFin: "08:00" },
};

const DIAS_LABELS: Record<DiasCobertura, { short: string; long: string }> = {
  toda_semana: { short: "L – D", long: "Lunes a Domingo" },
  lunes_viernes: { short: "L – V", long: "Lunes a Viernes" },
  fin_semana: { short: "S – D", long: "Sáb y Dom" },
};

export const DEFAULT_QUICK_PUESTO: Omit<QuickPuesto, "id"> = {
  dias: "toda_semana",
  jornada: "24h",
  turno: "dia",
  cantidad: 1,
};

let idCounter = 0;
function generateId(): string {
  return `qp_${Date.now()}_${++idCounter}`;
}

export function createDefaultQuickPuesto(): QuickPuesto {
  return { ...DEFAULT_QUICK_PUESTO, id: generateId() };
}

/**
 * Convierte los puestos rápidos al formato de dotación para la API
 */
export function buildDotacion(puestos: QuickPuesto[]): DotacionApiItem[] {
  return puestos
    .filter((p) => p.cantidad > 0)
    .map((p) => {
      const jornadaKey =
        p.jornada === "24h"
          ? "24h"
          : p.turno === "noche"
            ? "12h_noche"
            : "12h_dia";

      return {
        puesto: "Guardia de Seguridad",
        cantidad: p.cantidad,
        dias: DIAS_MAP[p.dias],
        horaInicio: HORARIO_MAP[jornadaKey].horaInicio,
        horaFin: HORARIO_MAP[jornadaKey].horaFin,
      };
    });
}

function getResumenPuesto(p: QuickPuesto): string {
  const diasLabel = DIAS_LABELS[p.dias].long;
  const jornadaLabel =
    p.jornada === "24h"
      ? "24h"
      : p.turno === "dia"
        ? "12h día"
        : "12h noche";
  return `${p.cantidad} guardia${p.cantidad > 1 ? "s" : ""} · ${jornadaLabel} · ${diasLabel}`;
}

// ═══════════════════════════════════════════
// COLLAPSIBLE WRAPPER (smooth height animation)
// ═══════════════════════════════════════════

function CollapsibleSection({ open, children }: { open: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  // Re-measure on content changes
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [open]);

  return (
    <div
      style={{
        maxHeight: height,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease, opacity 0.25s ease",
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SEGMENTED CONTROL
// ═══════════════════════════════════════════

interface SegmentedOption<T extends string> {
  value: T;
  labelShort: string;
  labelLong: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  ariaLabel: string;
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  ariaLabel,
}: SegmentedControlProps<T>) {
  const groupId = useId();

  return (
    <div>
      <label className="text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5 block">
        {label}
      </label>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="relative flex rounded-xl bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 p-1"
      >
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={opt.labelLong}
              id={`${groupId}-${opt.value}`}
              onClick={() => onChange(opt.value)}
              className={`
                relative z-10 flex-1 py-2.5 px-3 rounded-lg text-sm font-medium
                transition-all duration-200 ease-out
                min-h-[44px] flex items-center justify-center
                focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
                active:scale-[0.97]
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/80"
                }
              `}
            >
              <span className="sm:hidden">{opt.labelShort}</span>
              <span className="hidden sm:inline lg:hidden">{opt.labelShort}</span>
              <span className="hidden lg:inline">{opt.labelLong}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// DAY / NIGHT TOGGLE
// ═══════════════════════════════════════════

interface DayNightToggleProps {
  value: Turno;
  onChange: (value: Turno) => void;
}

function DayNightToggle({ value, onChange }: DayNightToggleProps) {
  const isNight = value === "noche";
  const horario = isNight ? "20:00 – 08:00" : "08:00 – 20:00";

  return (
    <div className="pt-1">
      <label className="text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5 block">
        Turno
      </label>
      <button
        type="button"
        role="switch"
        aria-checked={isNight}
        aria-label={isNight ? "Turno nocturno seleccionado" : "Turno diurno seleccionado"}
        onClick={() => onChange(isNight ? "dia" : "noche")}
        className="
          w-full flex items-center gap-3 rounded-xl
          bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10
          p-3 min-h-[44px]
          transition-all duration-200
          focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
          active:scale-[0.97]
        "
      >
        {/* Sun icon */}
        <span
          className={`flex items-center gap-1 text-sm font-medium transition-opacity duration-200 ${
            !isNight ? "opacity-100" : "opacity-40"
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" aria-hidden />
          <span className="text-gray-700 dark:text-white">{"Día"}</span>
        </span>

        {/* Track */}
        <div className="flex-1 relative h-6 rounded-full bg-gray-200 dark:bg-white/10 mx-1">
          <motion.div
            className="absolute top-0.5 w-5 h-5 rounded-full bg-blue-600 shadow-md"
            animate={{ left: isNight ? "calc(100% - 22px)" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>

        {/* Moon icon */}
        <span
          className={`flex items-center gap-1 text-sm font-medium transition-opacity duration-200 ${
            isNight ? "opacity-100" : "opacity-40"
          }`}
        >
          <Moon className="h-4 w-4 text-indigo-400" aria-hidden />
          <span className="text-gray-700 dark:text-white">Noche</span>
        </span>
      </button>

      {/* Horario resultante */}
      <p className="text-xs text-gray-400 dark:text-white/40 mt-1.5 text-center">
        {horario}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════
// QUANTITY STEPPER
// ═══════════════════════════════════════════

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function QuantityStepper({ value, onChange, min = 1, max = 10 }: QuantityStepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  const handleClick = (delta: number) => {
    const newVal = value + delta;
    if (newVal >= min && newVal <= max) {
      onChange(newVal);
      // Haptic feedback
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-gray-500 dark:text-white/50 mb-1.5 block">
        Cantidad de puestos
      </label>
      <div className="flex items-center rounded-xl bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => handleClick(-1)}
          disabled={!canDecrement}
          aria-label="Disminuir cantidad"
          className={`
            flex items-center justify-center w-12 h-11
            transition-all duration-150
            focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
            active:scale-[0.9]
            ${canDecrement
              ? "text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10"
              : "opacity-30 pointer-events-none"
            }
          `}
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="flex-1 text-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
            {value}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleClick(1)}
          disabled={!canIncrement}
          aria-label="Aumentar cantidad"
          className={`
            flex items-center justify-center w-12 h-11
            transition-all duration-150
            focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
            active:scale-[0.9]
            ${canIncrement
              ? "text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10"
              : "opacity-30 pointer-events-none"
            }
          `}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PUESTO CARD
// ═══════════════════════════════════════════

interface PuestoCardProps {
  puesto: QuickPuesto;
  index: number;
  canDelete: boolean;
  onUpdate: (updated: QuickPuesto) => void;
  onDelete: () => void;
}

function PuestoCard({ puesto, index, canDelete, onUpdate, onDelete }: PuestoCardProps) {
  const diasOptions: SegmentedOption<DiasCobertura>[] = [
    { value: "toda_semana", labelShort: "L – D", labelLong: "Lunes a Domingo" },
    { value: "lunes_viernes", labelShort: "L – V", labelLong: "Lunes a Viernes" },
    { value: "fin_semana", labelShort: "S – D", labelLong: "Sáb y Dom" },
  ];

  const jornadaOptions: SegmentedOption<Jornada>[] = [
    { value: "24h", labelShort: "24 horas", labelLong: "24 horas" },
    { value: "12h", labelShort: "12 horas", labelLong: "12 horas" },
  ];

  const update = <K extends keyof QuickPuesto>(key: K, val: QuickPuesto[K]) => {
    onUpdate({ ...puesto, [key]: val });
  };

  const resumen = getResumenPuesto(puesto);

  return (
    <div className="rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] p-5 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {"Puesto #"}{index + 1}
        </h4>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Eliminar puesto ${index + 1}`}
            className="
              p-1.5 rounded-lg text-gray-400 dark:text-white/40
              hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-500/10
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Desktop layout: inline row for lg+ */}
      <div className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-[1fr_auto_auto] lg:gap-5 lg:items-end">
        {/* Días de cobertura */}
        <SegmentedControl
          options={diasOptions}
          value={puesto.dias}
          onChange={(v) => update("dias", v)}
          label={"Días de cobertura"}
          ariaLabel={"Seleccionar días de cobertura"}
        />

        {/* Jornada */}
        <SegmentedControl
          options={jornadaOptions}
          value={puesto.jornada}
          onChange={(v) => update("jornada", v)}
          label="Jornada"
          ariaLabel="Seleccionar jornada"
        />
      </div>

      {/* Turno (solo si 12h) — animación suave con CSS */}
      <CollapsibleSection open={puesto.jornada === "12h"}>
        <DayNightToggle
          value={puesto.turno}
          onChange={(v) => update("turno", v)}
        />
      </CollapsibleSection>

      {/* Cantidad */}
      <QuantityStepper
        value={puesto.cantidad}
        onChange={(v) => update("cantidad", v)}
      />

      {/* Resumen */}
      <div className="flex justify-center">
        <span
          className="
            inline-block rounded-full
            bg-blue-50 dark:bg-blue-600/10
            text-blue-600 dark:text-blue-400
            px-4 py-1.5 text-[13px] font-medium
          "
        >
          {resumen}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT: DotacionQuickBuilder
// ═══════════════════════════════════════════

export default function DotacionQuickBuilder({
  puestos,
  onChange,
  onSwitchToManual,
}: DotacionQuickBuilderProps) {
  const updatePuesto = useCallback(
    (id: string, updated: QuickPuesto) => {
      onChange(puestos.map((p) => (p.id === id ? updated : p)));
    },
    [puestos, onChange]
  );

  const removePuesto = useCallback(
    (id: string) => {
      onChange(puestos.filter((p) => p.id !== id));
    },
    [puestos, onChange]
  );

  const addPuesto = useCallback(() => {
    onChange([...puestos, createDefaultQuickPuesto()]);
  }, [puestos, onChange]);

  // Totales
  const totalPuestos = puestos.length;
  const totalGuardias = puestos.reduce((sum, p) => sum + p.cantidad, 0);

  return (
    <div className="rounded-2xl border-2 border-blue-200 dark:border-blue-600/30 bg-blue-50/50 dark:bg-blue-600/5 p-5 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden />
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {"Estructura de Dotación"} <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-gray-500 dark:text-white/50">
            Define los guardias que necesitas
          </p>
        </div>
      </div>

      {/* Puesto Cards */}
      <div className="space-y-4">
        <AnimatePresence initial={false} mode="popLayout">
          {puestos.map((puesto, index) => (
            <motion.div
              key={puesto.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PuestoCard
                puesto={puesto}
                index={index}
                canDelete={puestos.length > 1}
                onUpdate={(updated) => updatePuesto(puesto.id, updated)}
                onDelete={() => removePuesto(puesto.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={addPuesto}
        className="
          w-full py-3.5 rounded-xl
          border border-dashed border-gray-300 dark:border-white/15
          text-blue-600 dark:text-blue-400
          text-sm font-medium
          hover:bg-blue-50 dark:hover:bg-blue-600/5
          hover:border-blue-400 dark:hover:border-blue-500
          transition-all duration-200
          focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
          active:scale-[0.98]
        "
      >
        + Agregar otro puesto
      </button>

      {/* Total summary */}
      <div className="rounded-xl bg-blue-100/60 dark:bg-blue-600/[0.08] py-3.5 px-5 text-center">
        <span className="text-[15px] font-semibold text-gray-900 dark:text-white">
          {"Total: "}{totalPuestos}{" puesto"}{totalPuestos !== 1 ? "s" : ""}{" · "}
          {totalGuardias}{" guardia"}{totalGuardias !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Manual mode link */}
      <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3.5 text-center">
        <button
          type="button"
          onClick={onSwitchToManual}
          className="
            text-sm text-gray-500 dark:text-white/50
            hover:text-blue-600 dark:hover:text-blue-400
            transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2
          "
        >
          {"¿Necesitas horarios especiales?"}{" "}
          <span className="font-medium text-blue-600 dark:text-blue-400 underline underline-offset-2">
            {"Configurar manualmente →"}
          </span>
        </button>
      </div>
    </div>
  );
}
