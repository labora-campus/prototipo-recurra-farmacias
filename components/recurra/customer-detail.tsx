"use client"

import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { getBranchById, formatSoles } from "./data"
import type { Customer } from "./data"

export type ReminderMode = "idle" | "preview" | "sent"

type CustomerDetailProps = {
  customer: Customer
  reminderMode: ReminderMode
  onPrepareReminder: () => void
  onConfirmReminder: () => void
  onCancelReminder: () => void
}

export function CustomerDetail({
  customer,
  reminderMode,
  onPrepareReminder,
  onConfirmReminder,
  onCancelReminder,
}: CustomerDetailProps) {
  const branch = getBranchById(customer.branchId)

  return (
    <Card className="app-card customer-detail-card">
      <CardHeader className="customer-detail-header">
        <div className="customer-detail-identity">
          <span className="customer-avatar customer-avatar-large">{customer.initials}</span>
          <div>
            <span className="section-kicker">CLIENTE EN SEGUIMIENTO</span>
            <h2>{customer.name}</h2>
            <p>{customer.category} · {branch.district}</p>
          </div>
        </div>
        <Badge variant="secondary" className={`risk-badge risk-${customer.risk.toLowerCase()}`}>
          Riesgo {customer.risk.toLowerCase()}
        </Badge>
      </CardHeader>

      <CardContent className="customer-detail-content">
        <div className="customer-snapshot-grid">
          <div><span>Riesgo estimado</span><strong>{customer.riskScore}%</strong></div>
          <div><span>Última compra</span><strong>{customer.lastPurchase}</strong></div>
          <div><span>Ticket promedio</span><strong>{formatSoles(customer.averageTicket)}</strong></div>
        </div>

        <section className="reason-section" aria-labelledby="risk-reasons-title">
          <div className="reason-heading">
            <span className="reason-heading-icon"><Sparkles aria-hidden="true" /></span>
            <div>
              <h3 id="risk-reasons-title">¿Por qué está en riesgo?</h3>
              <p>Señales de compra, no datos de salud.</p>
            </div>
          </div>
          <ul className="reason-list">
            {customer.reasons.map((reason) => (
              <li key={reason}><span aria-hidden="true" />{reason}</li>
            ))}
          </ul>
          <div className="risk-explanation">
            <CircleAlert aria-hidden="true" />
            <p>
              Su última compra fue hace <strong>{customer.daysSincePurchase} días</strong>. Su ritmo habitual es cada <strong>{customer.usualCycleDays} días</strong>, así que ya pasó su fecha estimada de regreso.
            </p>
          </div>
        </section>

        <section className="next-best-action" aria-labelledby="next-action-title">
          <div className="next-action-heading">
            <span className="next-action-icon"><MessageCircle aria-hidden="true" /></span>
            <div>
              <span className="section-kicker">SIGUIENTE MEJOR ACCIÓN</span>
              <h3 id="next-action-title">Un recordatorio amable</h3>
            </div>
          </div>
          <p>La IA sugiere saludar y dejar la puerta abierta para su próxima compra, sin mencionar productos específicos.</p>

          {reminderMode === "idle" ? (
            <Button type="button" className="primary-action" onClick={onPrepareReminder}>
              <MessageCircle data-icon="inline-start" aria-hidden="true" />
              Preparar recordatorio
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          ) : null}

          {reminderMode === "preview" ? (
            <div className="reminder-preview">
              <div className="reminder-preview-top"><span>VISTA PREVIA DE WHATSAPP</span><Badge variant="outline">Solo demo</Badge></div>
              <div className="whatsapp-bubble">{`Hola ${customer.name.split(" ")[0]}, hace unos días que no te vemos por Botica Salud Total. Cuando necesites volver, aquí estamos para ayudarte. ¡Te esperamos!`}</div>
              <div className="reminder-actions">
                <Button type="button" className="primary-action" onClick={onConfirmReminder}>
                  <Send data-icon="inline-start" aria-hidden="true" /> Simular envío
                </Button>
                <Button type="button" variant="ghost" onClick={onCancelReminder}>Cancelar</Button>
              </div>
              <p className="demo-disclaimer">No se conecta a WhatsApp ni se envía ningún mensaje real.</p>
            </div>
          ) : null}

          {reminderMode === "sent" ? (
            <div className="reminder-success" role="status">
              <span><Check aria-hidden="true" /></span>
              <div><strong>Recordatorio simulado</strong><p>El mensaje quedó registrado en esta vista de demostración; no se envió a WhatsApp.</p></div>
              <Button type="button" variant="ghost" size="sm" onClick={onPrepareReminder}>Repetir</Button>
            </div>
          ) : null}
        </section>

        <div className="customer-activity-note"><Clock3 aria-hidden="true" /> {customer.purchases12m} compras identificadas en los últimos 12 meses</div>
      </CardContent>
    </Card>
  )
}
