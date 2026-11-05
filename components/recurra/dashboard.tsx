"use client"

import { useState } from "react"
import { ChevronRight, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "./sidebar"
import { OverviewPage } from "./overview"
import { CustomersPage } from "./customers-page"
import { BranchesPage } from "./branches-page"
import { CampaignsPage } from "./campaigns-page"
import { DataPage } from "./data-page"
import { BRANCHES, RISK_CUSTOMERS } from "./data"
import type { AppSection, Branch, Customer, UploadSummary } from "./data"
import type { ReminderMode } from "./customer-detail"

const sectionLabels: Record<AppSection, string> = {
  resumen: "Resumen",
  clientes: "Clientes",
  sucursales: "Sucursales",
  campanas: "Campañas",
  datos: "Datos",
}

export function RecurraDashboard() {
  const [activeSection, setActiveSection] = useState<AppSection>("resumen")
  const [campaignApproved, setCampaignApproved] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState(RISK_CUSTOMERS[0].id)
  const [reminderMode, setReminderMode] = useState<ReminderMode>("idle")
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0].id)
  const [uploadSummary, setUploadSummary] = useState<UploadSummary | null>(null)
  const [optOutReply, setOptOutReply] = useState("")
  const [optOutConfirmed, setOptOutConfirmed] = useState(false)

  const selectedBranch = BRANCHES.find((branch) => branch.id === selectedBranchId) ?? BRANCHES[0]

  function selectCustomer(customer: Customer) {
    setSelectedCustomerId(customer.id)
    setReminderMode("idle")
    setActiveSection("clientes")
  }

  function selectBranch(branch: Branch) {
    setSelectedBranchId(branch.id)
  }

  function testOptOut(reply: string) {
    if (reply.trim().toLocaleUpperCase("es-PE") !== "BAJA") return false
    setOptOutConfirmed(true)
    return true
  }

  function resetOptOut() {
    setOptOutConfirmed(false)
    setOptOutReply("")
  }

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="main-area" id="main-content">
        <header className="app-topbar">
          <div className="breadcrumb-line">
            <span className="breadcrumb-chain">Botica Salud Total</span>
            <ChevronRight aria-hidden="true" />
            <span aria-current="page">{sectionLabels[activeSection]}</span>
          </div>
          <div className="topbar-right">
            <Badge variant="secondary" className="topbar-demo-badge"><span className="topbar-demo-dot" /> Modo demostración</Badge>
            <span className="owner-chip"><span className="owner-avatar">AR</span><span><strong>Ana R.</strong><small>Dueña de cadena</small></span></span>
          </div>
        </header>

        <div className="page-content">
          {activeSection === "resumen" ? (
            <OverviewPage
              campaignApproved={campaignApproved}
              onApproveCampaign={() => setCampaignApproved(true)}
              onNavigate={setActiveSection}
              onSelectCustomer={selectCustomer}
            />
          ) : null}

          {activeSection === "clientes" ? (
            <CustomersPage
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={selectCustomer}
              reminderMode={reminderMode}
              onPrepareReminder={() => setReminderMode("preview")}
              onConfirmReminder={() => setReminderMode("sent")}
              onCancelReminder={() => setReminderMode("idle")}
            />
          ) : null}

          {activeSection === "sucursales" ? (
            <BranchesPage selectedBranch={selectedBranch} onSelectBranch={selectBranch} />
          ) : null}

          {activeSection === "campanas" ? (
            <CampaignsPage
              campaignApproved={campaignApproved}
              onApproveCampaign={() => setCampaignApproved(true)}
              optOutReply={optOutReply}
              onOptOutReplyChange={setOptOutReply}
              optOutConfirmed={optOutConfirmed}
              onTestOptOut={testOptOut}
              onResetOptOut={resetOptOut}
            />
          ) : null}

          {activeSection === "datos" ? (
            <DataPage uploadSummary={uploadSummary} onFileProcessed={setUploadSummary} />
          ) : null}
        </div>

        <footer className="app-footer">
          <span>Recurra · fidelización para farmacias</span>
          <span><Database aria-hidden="true" /> Datos ficticios · sin conexiones externas</span>
        </footer>
      </main>
    </div>
  )
}
