"use client"

import { useState, type FormEvent } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleCheck,
  Clock3,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { COMPLETED_CAMPAIGNS, formatSoles } from "./data"

export function CampaignsPage({
  campaignApproved,
  onApproveCampaign,
  optOutReply,
  onOptOutReplyChange,
  optOutConfirmed,
  onTestOptOut,
  onResetOptOut,
}: {
  campaignApproved: boolean
  onApproveCampaign: () => void
  optOutReply: string
  onOptOutReplyChange: (value: string) => void
  optOutConfirmed: boolean
  onTestOptOut: (value: string) => boolean
  onResetOptOut: () => void
}) {
  const [optOutError, setOptOutError] = useState("")

  function handleOptOutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const passed = onTestOptOut(optOutReply)
    setOptOutError(passed ? "" : "Escribe BAJA para probar la baja de mensajes.")
  }

  function handleReset() {
    setOptOutError("")
    onResetOptOut()
  }

  return (
    <div className="page-stack">
      <div className="page-heading-row">
        <div className="page-heading">
          <span className="page-eyebrow">MENSAJES QUE HACEN VOLVER</span>
          <h1>Campañas</h1>
          <p>La IA propone el siguiente paso; tú decides si se aprueba.</p>
        </div>
        <div className="week-chip"><Clock3 aria-hidden="true" /> Semana del 2 al 8 nov</div>
      </div>

      <div className="campaigns-layout-grid">
        <div className="campaigns-main-column">
          <Card className="app-card campaign-proposal-card">
            <CardHeader className="section-card-header campaign-proposal-header">
              <div>
                <span className="section-kicker">PROPUESTA DE LA SEMANA</span>
                <CardTitle className="section-title">Un detalle para volver</CardTitle>
                <p className="card-subtitle">Un mensaje amable para clientes que cambiaron su frecuencia de compra.</p>
              </div>
              <Badge variant="secondary" className={campaignApproved ? "approved-badge" : "ai-badge"}>
                {campaignApproved ? <Check data-icon="inline-start" aria-hidden="true" /> : <Sparkles data-icon="inline-start" aria-hidden="true" />}
                {campaignApproved ? "Aprobada en demo" : "Propuesta IA"}
              </Badge>
            </CardHeader>
            <CardContent className="campaign-proposal-content">
              <div className="campaign-kpi-row">
                <div><span>Audiencia sugerida</span><strong>74 clientes</strong><small>Alta probabilidad de volver</small></div>
                <div><span>Retorno estimado</span><strong>18%</strong><small>Proyección, no garantía</small></div>
                <div><span>Venta potencial</span><strong>{formatSoles(5200)}</strong><small>Basada en compras previas</small></div>
              </div>
              <div className="campaign-message-preview">
                <div className="campaign-message-heading"><span className="message-channel-icon"><MessageCircle aria-hidden="true" /></span><div><strong>Mensaje sugerido</strong><small>WhatsApp · texto corto</small></div></div>
                <p>Hola, {"{{nombre}}"}. Hace unos días que no te vemos por Botica Salud Total. Cuando necesites volver, aquí estamos para ayudarte. ¡Te esperamos!</p>
                <span className="message-safety-note"><ShieldCheck aria-hidden="true" /> Sin recomendaciones de salud ni productos específicos.</span>
              </div>
              <div className="campaign-bottom-row">
                <Button type="button" className="primary-action" onClick={onApproveCampaign} disabled={campaignApproved}>
                  {campaignApproved ? <Check data-icon="inline-start" aria-hidden="true" /> : <BadgeCheck data-icon="inline-start" aria-hidden="true" />}
                  {campaignApproved ? "Aprobada en demo" : "Aprobar campaña"}
                  {!campaignApproved ? <ArrowRight data-icon="inline-end" aria-hidden="true" /> : null}
                </Button>
                <p>{campaignApproved ? "Quedó aprobada en esta sesión. No se envió ningún mensaje." : "Al aprobar, solo cambia el estado de esta demostración; no se envía nada."}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="app-card campaign-history-card">
            <CardHeader className="section-card-header">
              <div>
                <span className="section-kicker">RESULTADOS ANTERIORES</span>
                <CardTitle className="section-title">Campañas terminadas</CardTitle>
              </div>
              <Badge variant="outline" className="quiet-badge">2 campañas</Badge>
            </CardHeader>
            <CardContent className="campaign-history-list">
              {COMPLETED_CAMPAIGNS.map((campaign) => (
                <article className="campaign-history-row" key={campaign.id}>
                  <div className="campaign-history-icon"><CircleCheck aria-hidden="true" /></div>
                  <div className="campaign-history-main">
                    <strong>{campaign.name}</strong>
                    <span>Terminó el {campaign.date} · {campaign.audience} clientes</span>
                  </div>
                  <div className="campaign-result"><strong>{campaign.returns}</strong><span>volvieron</span></div>
                  <div className="campaign-result"><strong>{campaign.returnRate}%</strong><span>tasa de retorno</span></div>
                  <div className="campaign-result campaign-result-sales"><strong>{formatSoles(campaign.revenue)}</strong><span>venta atribuida</span></div>
                </article>
              ))}
              <div className="campaign-history-total"><TrendingUp aria-hidden="true" /><span>En conjunto, ambas campañas atribuyeron <strong>{formatSoles(11400)}</strong> en ventas.</span></div>
            </CardContent>
          </Card>
        </div>

        <Card className="app-card whatsapp-lab-card">
          <CardHeader className="whatsapp-lab-header">
            <div className="whatsapp-lab-icon"><MessageCircle aria-hidden="true" /></div>
            <span className="section-kicker">ENTORNO DE PRUEBA</span>
            <CardTitle className="section-title">Prueba la baja por WhatsApp</CardTitle>
            <p className="card-subtitle">Comprueba que una respuesta BAJA detiene futuras campañas para ese contacto.</p>
          </CardHeader>
          <CardContent className="whatsapp-lab-content">
            <div className="sandbox-chat" aria-live="polite">
              <div className="sandbox-chat-label">SIMULACIÓN · BOTICA SALUD TOTAL</div>
              <div className="sandbox-message">Hola, gracias por tu compra. Responde <strong>BAJA</strong> si ya no quieres recibir mensajes.</div>
              {optOutReply.trim() ? <div className="sandbox-user-reply">{optOutReply.trim()}</div> : null}
              {optOutConfirmed ? <div className="sandbox-optout-message"><Check aria-hidden="true" /><span>Listo. Este contacto ya no recibirá campañas en esta simulación.</span></div> : null}
            </div>

            {!optOutConfirmed ? (
              <form onSubmit={handleOptOutSubmit} className="optout-form">
                <FieldGroup>
                  <Field data-invalid={Boolean(optOutError)}>
                    <FieldLabel htmlFor="optout-reply">Respuesta del cliente</FieldLabel>
                    <Input
                      id="optout-reply"
                      value={optOutReply}
                      onChange={(event) => {
                        onOptOutReplyChange(event.target.value)
                        if (optOutError) setOptOutError("")
                      }}
                      placeholder="Escribe BAJA"
                      autoComplete="off"
                      aria-invalid={Boolean(optOutError)}
                    />
                    <FieldDescription>Prueba el flujo escribiendo BAJA; no se conecta a WhatsApp.</FieldDescription>
                    {optOutError ? <FieldError>{optOutError}</FieldError> : null}
                  </Field>
                </FieldGroup>
                <Button type="submit" className="primary-action full-width-button">
                  <Send data-icon="inline-start" aria-hidden="true" /> Probar respuesta
                </Button>
              </form>
            ) : (
              <div className="optout-complete" role="status">
                <div className="optout-complete-copy"><span><Check aria-hidden="true" /></span><div><strong>Baja respetada</strong><p>El contacto queda excluido de futuras campañas en esta prueba.</p></div></div>
                <Button type="button" variant="outline" className="full-width-button" onClick={handleReset}>Restablecer prueba</Button>
              </div>
            )}
            <p className="sandbox-privacy-note"><ShieldCheck aria-hidden="true" /> Todos los mensajes de este panel son ficticios; no se contacta a ninguna persona.</p>
          </CardContent>
        </Card>
      </div>
      <p className="demo-footnote"><Sparkles aria-hidden="true" /> Resultados históricos y proyecciones incluidos como datos de demostración.</p>
    </div>
  )
}
