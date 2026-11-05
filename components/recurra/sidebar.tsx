"use client"

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleHelp,
  Database,
  LayoutDashboard,
  MapPinned,
  Megaphone,
  Repeat2,
  Sparkles,
  UsersRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AppSection } from "./data"

type SidebarProps = {
  activeSection: AppSection
  onNavigate: (section: AppSection) => void
}

const navigation: { id: AppSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "clientes", label: "Clientes", icon: UsersRound },
  { id: "sucursales", label: "Sucursales", icon: MapPinned },
  { id: "campanas", label: "Campañas", icon: Megaphone },
  { id: "datos", label: "Datos", icon: Database },
]

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <button
        type="button"
        className="brand-lockup"
        onClick={() => onNavigate("resumen")}
        aria-label="Recurra, ir al resumen"
      >
        <span className="brand-symbol" aria-hidden="true">
          <Repeat2 />
        </span>
        <span className="brand-wordmark">
          <span className="brand-name">recurra</span>
          <span className="brand-tagline">Fidelidad que vuelve</span>
        </span>
      </button>

      <div className="chain-switcher" aria-label="Cadena seleccionada">
        <div className="chain-mark" aria-hidden="true">ST</div>
        <div className="chain-copy">
          <span>Botica Salud Total</span>
          <small>6 sucursales · Lima</small>
        </div>
        <Building2 className="chain-chevron" aria-hidden="true" />
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        <p className="sidebar-label">ESPACIO DE TRABAJO</p>
        {navigation.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant="ghost"
            className={cn("nav-item", activeSection === id && "is-active")}
            onClick={() => onNavigate(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon data-icon="inline-start" aria-hidden="true" />
            <span>{label}</span>
            {id === "campanas" && activeSection !== "campanas" ? (
              <span className="nav-indicator" aria-label="Hay una campaña para revisar" />
            ) : null}
          </Button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="copilot-card">
          <div className="copilot-heading">
            <span className="copilot-icon"><Sparkles aria-hidden="true" /></span>
            <span>Tu copiloto</span>
            <BadgeCheck className="copilot-check" aria-hidden="true" />
          </div>
          <p>La IA encuentra oportunidades. Tú eliges qué hacer.</p>
          <button type="button" className="copilot-link" onClick={() => onNavigate("campanas")}>
            Ver recomendación <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="sidebar-meta">
          <span className="demo-indicator"><span />Modo demostración</span>
          <Button type="button" variant="ghost" size="sm" className="help-link" onClick={() => onNavigate("datos")}>
            <CircleHelp data-icon="inline-start" aria-hidden="true" />
            Acerca de los datos
          </Button>
        </div>
      </div>
    </aside>
  )
}
