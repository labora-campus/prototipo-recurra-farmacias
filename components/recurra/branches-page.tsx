"use client"

import dynamic from "next/dynamic"
import { ArrowUpRight, MapPin, MapPinned, UsersRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BRANCHES, formatSoles } from "./data"
import type { Branch } from "./data"

const InteractiveBranchMap = dynamic(() => import("./branch-map"), {
  ssr: false,
  loading: () => <div className="map-loading" role="status">Preparando mapa de Lima…</div>,
})

export function BranchesPage({
  selectedBranch,
  onSelectBranch,
}: {
  selectedBranch: Branch
  onSelectBranch: (branch: Branch) => void
}) {
  return (
    <div className="page-stack">
      <div className="page-heading-row">
        <div className="page-heading">
          <span className="page-eyebrow">PRESENCIA LOCAL</span>
          <h1>Tus sucursales</h1>
          <p>Explora el mapa y compara la actividad de las seis boticas en Lima.</p>
        </div>
        <div className="week-chip"><MapPinned aria-hidden="true" /> 6 puntos de venta</div>
      </div>

      <div className="branches-workspace-grid">
        <Card className="app-card branch-map-card">
          <CardHeader className="section-card-header">
            <div>
              <span className="section-kicker">MAPA DE SUCURSALES</span>
              <CardTitle className="section-title">Lima Metropolitana</CardTitle>
            </div>
            <Badge variant="outline" className="quiet-badge"><MapPin data-icon="inline-start" aria-hidden="true" /> Perú</Badge>
          </CardHeader>
          <CardContent className="branch-map-content">
            <InteractiveBranchMap selectedBranch={selectedBranch} onSelectBranch={onSelectBranch} />
            <p className="map-caption">Selecciona un marcador o una sucursal para ver su actividad.</p>
          </CardContent>
        </Card>

        <div className="branch-side-column">
          <Card className="app-card selected-branch-card">
            <CardHeader className="section-card-header">
              <div>
                <span className="section-kicker">SUCURSAL SELECCIONADA</span>
                <CardTitle className="section-title">{selectedBranch.name}</CardTitle>
              </div>
              <span className="branch-selected-icon"><MapPin aria-hidden="true" /></span>
            </CardHeader>
            <CardContent>
              <p className="branch-location-label">Botica Salud Total · {selectedBranch.district}</p>
              <div className="selected-branch-stats">
                <div><span>Clientes identificados</span><strong>{selectedBranch.monthlyCustomers}</strong></div>
                <div><span>Venta mensual</span><strong>{formatSoles(selectedBranch.monthlySales)}</strong></div>
                <div><span>Ticket promedio</span><strong>{formatSoles(selectedBranch.averageTicket)}</strong></div>
                <div><span>En riesgo</span><strong>{selectedBranch.riskCustomers}</strong></div>
              </div>
            </CardContent>
          </Card>

          <Card className="app-card branch-list-card">
            <CardHeader className="section-card-header">
              <div>
                <span className="section-kicker">RED DE BOTICAS</span>
                <CardTitle className="section-title">Elige una sucursal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="branch-selector-list">
              {BRANCHES.map((branch, index) => (
                <button
                  type="button"
                  key={branch.id}
                  className="branch-option"
                  onClick={() => onSelectBranch(branch)}
                  aria-pressed={branch.id === selectedBranch.id}
                >
                  <span className={`branch-number ${branch.id === selectedBranch.id ? "is-active" : ""}`}>{index + 1}</span>
                  <span className="branch-option-name"><strong>{branch.name}</strong><small>{branch.district}</small></span>
                  <span className="branch-option-meta"><UsersRound aria-hidden="true" />{branch.monthlyCustomers}</span>
                  <ArrowUpRight className="branch-option-arrow" aria-hidden="true" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <p className="demo-footnote"><MapPin aria-hidden="true" /> Los puntos son ubicaciones referenciales para esta demostración.</p>
    </div>
  )
}
