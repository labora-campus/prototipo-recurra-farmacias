"use client"

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  Database,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingUp,
  UserRoundSearch,
  UsersRound,
  Wallet,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BRANCHES, MONTHLY_PURCHASES, RISK_CUSTOMERS, formatSoles } from "./data"
import type { AppSection, Customer } from "./data"

const chartConfig = {
  orders: {
    label: "Compras identificadas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type OverviewProps = {
  campaignApproved: boolean
  onApproveCampaign: () => void
  onNavigate: (section: AppSection) => void
  onSelectCustomer: (customer: Customer) => void
}

export function OverviewPage({
  campaignApproved,
  onApproveCampaign,
  onNavigate,
  onSelectCustomer,
}: OverviewProps) {
  return (
    <div className="page-stack">
      <div className="page-heading-row">
        <div className="page-heading">
          <span className="page-eyebrow">MIÉRCOLES, 4 DE NOVIEMBRE DE 2026</span>
          <h1>Buenos días, Ana</h1>
          <p>Esto es lo más importante para Botica Salud Total esta semana.</p>
        </div>
        <div className="week-chip"><Clock3 aria-hidden="true" /> Semana del 2 al 8 nov</div>
      </div>

      <WeeklyBrief
        approved={campaignApproved}
        onApprove={onApproveCampaign}
        onOpenCampaigns={() => onNavigate("campanas")}
      />

      <div className="metric-grid">
        <MetricCard
          label="Clientes identificados"
          value="3,084"
          note="En los últimos 12 meses"
          icon={UsersRound}
          tone="green"
          trend="+8.2%"
        />
        <MetricCard
          label="En riesgo de abandono"
          value="186"
          note="6% de tu base de clientes"
          icon={UserRoundSearch}
          tone="amber"
          trend="74 recuperables"
        />
        <MetricCard
          label="Ventas recuperadas"
          value={formatSoles(11400)}
          note="Atribuidas a 2 campañas"
          icon={Wallet}
          tone="mint"
          trend="+19%"
        />
        <MetricCard
          label="Ventas anónimas"
          value="55%"
          note="Sin datos para reconocer al cliente"
          icon={Database}
          tone="blue"
          trend="Oportunidad"
        />
      </div>

      <div className="overview-grid">
        <PurchaseTrendCard />
        <BranchPulseCard onNavigate={() => onNavigate("sucursales")} />
      </div>

      <div className="overview-grid overview-grid-lower">
        <RiskQueueCard onOpenCustomers={() => onNavigate("clientes")} onSelectCustomer={onSelectCustomer} />
        <QuickActionsCard onNavigate={onNavigate} />
      </div>

      <p className="demo-footnote"><Sparkles aria-hidden="true" /> Los hallazgos y proyecciones de esta vista usan datos de demostración.</p>
    </div>
  )
}

function WeeklyBrief({
  approved,
  onApprove,
  onOpenCampaigns,
}: {
  approved: boolean
  onApprove: () => void
  onOpenCampaigns: () => void
}) {
  return (
    <section className="weekly-hero" aria-labelledby="weekly-summary-title">
      <div className="weekly-copy">
        <div className="hero-label"><Sparkles aria-hidden="true" /> RESUMEN SEMANAL CON IA</div>
        <h2 id="weekly-summary-title">Hay 74 clientes a tiempo de volver.</h2>
        <p>
          Detectamos 186 clientes que se están alejando de su ritmo habitual. Una nota oportuna puede ayudar a que regresen.
        </p>
        <div className="hero-stat-row">
          <div><strong>74</strong><span>alta probabilidad de volver</span></div>
          <span className="hero-stat-divider" aria-hidden="true" />
          <div><strong>{formatSoles(5200)}</strong><span>venta potencial estimada</span></div>
        </div>
        <span className="hero-estimate">Proyección orientativa, no garantizada</span>
      </div>

      <div className="suggestion-card">
        <div className="suggestion-header">
          <div className="suggestion-title-wrap">
            <span className="suggestion-icon"><MessageCircle aria-hidden="true" /></span>
            <div>
              <span className="suggestion-kicker">PROPUESTA DE RECURRENCE</span>
              <h3>Un detalle para volver</h3>
            </div>
          </div>
          <Badge variant="secondary" className="suggestion-badge">Borrador IA</Badge>
        </div>
        <div className="suggestion-message">
          <span>WhatsApp · 74 clientes</span>
          <p>Hola, {"{{nombre}}"}. Hace unos días que no te vemos por Botica Salud Total. Cuando necesites volver, aquí estamos para ayudarte. ¡Te esperamos!</p>
        </div>
        <div className="suggestion-footer">
          <Button type="button" className="approve-button" onClick={onApprove} disabled={approved}>
            {approved ? <Check data-icon="inline-start" aria-hidden="true" /> : <BadgeCheck data-icon="inline-start" aria-hidden="true" />}
            {approved ? "Aprobada en demo" : "Aprobar campaña"}
          </Button>
          <Button type="button" variant="ghost" size="sm" className="preview-link" onClick={onOpenCampaigns}>
            Revisar <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
        {approved ? (
          <p role="status" className="approval-status">Lista para programar. No se envió ningún mensaje.</p>
        ) : (
          <p className="approval-hint">La IA propone. Tú apruebas con un clic.</p>
        )}
      </div>
    </section>
  )
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  tone,
  trend,
}: {
  label: string
  value: string
  note: string
  icon: typeof UsersRound
  tone: string
  trend: string
}) {
  return (
    <Card className="metric-card">
      <CardContent className="metric-content">
        <div className="metric-topline">
          <span className={`metric-icon ${tone}`}><Icon aria-hidden="true" /></span>
          <span className="metric-trend"><ArrowUpRight aria-hidden="true" />{trend}</span>
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
        <p className="metric-note">{note}</p>
      </CardContent>
    </Card>
  )
}

function PurchaseTrendCard() {
  return (
    <Card className="app-card trend-card">
      <CardHeader className="section-card-header">
        <div>
          <span className="section-kicker">COMPORTAMIENTO DE COMPRA</span>
          <CardTitle className="section-title">Compras identificadas</CardTitle>
        </div>
        <Badge variant="outline" className="quiet-badge">12 meses</Badge>
      </CardHeader>
      <CardContent className="trend-content">
        <ChartContainer config={chartConfig} className="h-[245px] min-h-[245px] w-full">
          <AreaChart data={MONTHLY_PURCHASES} margin={{ top: 12, right: 10, left: 2, bottom: 0 }} accessibilityLayer>
            <defs>
              <linearGradient id="recurra-orders-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-orders)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-orders)" stopOpacity={0.015} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 4" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="var(--color-orders)"
              strokeWidth={2.5}
              fill="url(#recurra-orders-fill)"
              activeDot={{ r: 4, fill: "var(--color-orders)" }}
            />
          </AreaChart>
        </ChartContainer>
        <div className="chart-caption"><span><i />Compras vinculadas a clientes conocidos</span><span>Datos demo</span></div>
      </CardContent>
    </Card>
  )
}

function BranchPulseCard({ onNavigate }: { onNavigate: () => void }) {
  const rankedBranches = [...BRANCHES].sort((a, b) => b.monthlyCustomers - a.monthlyCustomers).slice(0, 3)
  const maxCustomers = rankedBranches[0].monthlyCustomers

  return (
    <Card className="app-card branch-pulse-card">
      <CardHeader className="section-card-header">
        <div>
          <span className="section-kicker">TUS SUCURSALES</span>
          <CardTitle className="section-title">Movimiento en Lima</CardTitle>
        </div>
        <span className="soft-icon"><MapPin aria-hidden="true" /></span>
      </CardHeader>
      <CardContent className="branch-pulse-content">
        {rankedBranches.map((branch, index) => (
          <div className="branch-rank-row" key={branch.id}>
            <span className="branch-rank">0{index + 1}</span>
            <div className="branch-rank-main">
              <div className="branch-rank-top"><strong>{branch.name}</strong><span>{branch.monthlyCustomers} clientes</span></div>
              <div className="branch-progress-track"><span style={{ width: `${(branch.monthlyCustomers / maxCustomers) * 100}%` }} /></div>
            </div>
          </div>
        ))}
        <div className="branch-pulse-note">
          <div className="branch-note-icon"><TrendingUp aria-hidden="true" /></div>
          <p><strong>San Isidro</strong> tiene el mayor ticket promedio de la cadena: {formatSoles(72)}.</p>
        </div>
        <Button type="button" variant="outline" className="full-width-button" onClick={onNavigate}>
          Explorar las 6 sucursales <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  )
}

function RiskQueueCard({
  onOpenCustomers,
  onSelectCustomer,
}: {
  onOpenCustomers: () => void
  onSelectCustomer: (customer: Customer) => void
}) {
  return (
    <Card className="app-card risk-queue-card">
      <CardHeader className="section-card-header">
        <div>
          <span className="section-kicker">PARA REVISAR ESTA SEMANA</span>
          <CardTitle className="section-title">Clientes que se están enfriando</CardTitle>
        </div>
        <Badge variant="secondary" className="risk-count-badge">186</Badge>
      </CardHeader>
      <CardContent className="risk-queue-content">
        {RISK_CUSTOMERS.slice(0, 3).map((customer) => (
          <div className="risk-queue-row" key={customer.id}>
            <span className="customer-avatar">{customer.initials}</span>
            <div className="risk-queue-info">
              <strong>{customer.name}</strong>
              <span>{customer.daysSincePurchase} días sin comprar · suele volver cada {customer.usualCycleDays}</span>
            </div>
            <Badge variant="secondary" className={`risk-badge risk-${customer.risk.toLowerCase()}`}>{customer.risk === "Alto" ? "Alto" : "Medio"}</Badge>
            <Button type="button" variant="ghost" size="sm" className="why-button" onClick={() => onSelectCustomer(customer)}>
              Ver por qué <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="link" className="see-all-button" onClick={onOpenCustomers}>
          Ver lista de clientes en riesgo <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActionsCard({ onNavigate }: { onNavigate: (section: AppSection) => void }) {
  return (
    <Card className="app-card quick-actions-card">
      <CardHeader className="section-card-header">
        <div>
          <span className="section-kicker">SIGUIENTE PASO</span>
          <CardTitle className="section-title">Acciones rápidas</CardTitle>
        </div>
        <span className="soft-icon"><ArrowRight aria-hidden="true" /></span>
      </CardHeader>
      <CardContent className="quick-action-list">
        <button type="button" className="quick-action" onClick={() => onNavigate("campanas")}>
          <span className="quick-action-icon quick-message"><MessageCircle aria-hidden="true" /></span>
          <span><strong>Probar baja en WhatsApp</strong><small>Verifica cómo se respeta la respuesta BAJA</small></span>
          <ArrowRight aria-hidden="true" />
        </button>
        <button type="button" className="quick-action" onClick={() => onNavigate("datos")}>
          <span className="quick-action-icon quick-data"><Database aria-hidden="true" /></span>
          <span><strong>Subir base de clientes</strong><small>Revisa el formato de datos aceptado</small></span>
          <ArrowRight aria-hidden="true" />
        </button>
        <button type="button" className="quick-action" onClick={() => onNavigate("clientes")}>
          <span className="quick-action-icon quick-customer"><UserRoundSearch aria-hidden="true" /></span>
          <span><strong>Entender un riesgo</strong><small>Revisa las señales de un cliente</small></span>
          <ArrowRight aria-hidden="true" />
        </button>
      </CardContent>
    </Card>
  )
}
