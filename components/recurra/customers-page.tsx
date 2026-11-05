"use client"

import { useMemo, useState } from "react"
import { ArrowDownUp, ArrowRight, Search, UsersRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CustomerDetail, type ReminderMode } from "./customer-detail"
import { RISK_CUSTOMERS } from "./data"
import type { Customer } from "./data"

export function CustomersPage({
  selectedCustomerId,
  onSelectCustomer,
  reminderMode,
  onPrepareReminder,
  onConfirmReminder,
  onCancelReminder,
}: {
  selectedCustomerId: string
  onSelectCustomer: (customer: Customer) => void
  reminderMode: ReminderMode
  onPrepareReminder: () => void
  onConfirmReminder: () => void
  onCancelReminder: () => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"Todos" | "Alto" | "Medio">("Todos")
  const selectedCustomer = RISK_CUSTOMERS.find((customer) => customer.id === selectedCustomerId) ?? RISK_CUSTOMERS[0]

  const visibleCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-PE")
    return RISK_CUSTOMERS.filter((customer) => {
      const matchesRisk = filter === "Todos" || customer.risk === filter
      const matchesSearch = !normalizedQuery || customer.name.toLocaleLowerCase("es-PE").includes(normalizedQuery)
      return matchesRisk && matchesSearch
    })
  }, [filter, query])

  return (
    <div className="page-stack">
      <div className="page-heading-row">
        <div className="page-heading">
          <span className="page-eyebrow">RELACIÓN CON CLIENTES</span>
          <h1>Clientes en riesgo</h1>
          <p>Entiende qué cambió y decide si es momento de acercarte.</p>
        </div>
        <div className="customer-total-chip"><UsersRound aria-hidden="true" /><strong>186</strong> clientes por revisar</div>
      </div>

      <div className="customer-workspace-grid">
        <Card className="app-card customer-list-card">
          <CardHeader className="customer-list-header">
            <div>
              <span className="section-kicker">SEÑALES DE COMPRA</span>
              <CardTitle className="section-title">Clientes que se están enfriando</CardTitle>
              <p className="card-subtitle">Muestra de 5 clientes con cambios recientes en su frecuencia.</p>
            </div>
            <Badge variant="outline" className="quiet-badge">186 en riesgo</Badge>
          </CardHeader>
          <CardContent className="customer-list-content">
            <div className="customer-toolbar">
              <Field className="customer-search-field">
                <FieldLabel htmlFor="customer-search" className="sr-only">Buscar cliente</FieldLabel>
                <div className="search-control">
                  <Search aria-hidden="true" />
                  <Input
                    id="customer-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar por nombre"
                    autoComplete="off"
                  />
                </div>
              </Field>
              <div className="filter-group" aria-label="Filtrar por nivel de riesgo">
                {(["Todos", "Alto", "Medio"] as const).map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`filter-chip ${filter === value ? "is-selected" : ""}`}
                    onClick={() => setFilter(value)}
                    aria-pressed={filter === value}
                  >
                    {value === "Todos" ? "Todos" : `Riesgo ${value.toLowerCase()}`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="customer-table-wrap">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th scope="col">Cliente <ArrowDownUp aria-hidden="true" /></th>
                    <th scope="col">Última compra</th>
                    <th scope="col">Ritmo habitual</th>
                    <th scope="col">Riesgo</th>
                    <th scope="col"><span className="sr-only">Acción</span></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCustomers.map((customer) => (
                    <tr key={customer.id} data-selected={customer.id === selectedCustomer.id}>
                      <td>
                        <button type="button" className="customer-name-button" onClick={() => onSelectCustomer(customer)} aria-label={`Ver señales de riesgo de ${customer.name}`}>
                          <span className="customer-avatar">{customer.initials}</span>
                          <span><strong>{customer.name}</strong><small>{customer.category}</small></span>
                        </button>
                      </td>
                      <td><strong className="table-date">{customer.lastPurchase}</strong><small>{customer.daysSincePurchase} días atrás</small></td>
                      <td><strong>Cada {customer.usualCycleDays} días</strong><small>{customer.purchases12m} compras este año</small></td>
                      <td>
                        <Badge variant="secondary" className={`risk-badge risk-${customer.risk.toLowerCase()}`}>Riesgo {customer.risk.toLowerCase()}</Badge>
                      </td>
                      <td>
                        <Button type="button" variant="ghost" size="sm" className="table-action" onClick={() => onSelectCustomer(customer)}>
                          Ver por qué <ArrowRight data-icon="inline-end" aria-hidden="true" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {visibleCustomers.length === 0 ? (
                    <tr><td colSpan={5} className="empty-table-state">No encontramos clientes con ese nombre o filtro.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            <p className="table-note">Los nombres y patrones de esta muestra son ficticios y solo sirven para explorar el prototipo.</p>
          </CardContent>
        </Card>

        <CustomerDetail
          customer={selectedCustomer}
          reminderMode={reminderMode}
          onPrepareReminder={onPrepareReminder}
          onConfirmReminder={onConfirmReminder}
          onCancelReminder={onCancelReminder}
        />
      </div>
    </div>
  )
}
