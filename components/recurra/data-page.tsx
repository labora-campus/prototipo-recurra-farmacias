"use client"

import { useState, type DragEvent, type ChangeEvent } from "react"
import {
  Check,
  Database,
  FileSpreadsheet,
  ShieldCheck,
  Upload,
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
import type { UploadSummary } from "./data"

function parseCsv(content: string) {
  const records: string[][] = []
  let record: string[] = []
  let value = ""
  let insideQuotes = false

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index]
    if (character === '"') {
      if (insideQuotes && content[index + 1] === '"') {
        value += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (character === "," && !insideQuotes) {
      record.push(value.trim())
      value = ""
    } else if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && content[index + 1] === "\n") index += 1
      record.push(value.trim())
      if (record.some((cell) => cell.length > 0)) records.push(record)
      record = []
      value = ""
    } else {
      value += character
    }
  }

  if (value.length > 0 || record.length > 0) {
    record.push(value.trim())
    if (record.some((cell) => cell.length > 0)) records.push(record)
  }

  const headers = (records[0] ?? []).map((header, index) =>
    (index === 0 ? header.replace(/^\uFEFF/, "") : header).trim(),
  )
  const rows = records.slice(1).filter((row) => row.some((cell) => cell.length > 0))
  return { headers, rows }
}

export function DataPage({
  uploadSummary,
  onFileProcessed,
}: {
  uploadSummary: UploadSummary | null
  onFileProcessed: (summary: UploadSummary) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")

  async function processFile(file?: File) {
    if (!file) return
    setError("")
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Esta demo procesa archivos CSV. Guarda tu hoja como CSV e inténtalo de nuevo.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo supera el límite de 5 MB de esta demo.")
      return
    }

    try {
      const content = await file.text()
      const { headers, rows } = parseCsv(content)
      if (headers.length < 2) {
        setError("No encontramos encabezados suficientes. Revisa que el archivo tenga columnas separadas por comas.")
        return
      }
      onFileProcessed({ name: file.name, rows: rows.length, columns: headers.filter(Boolean).slice(0, 6) })
    } catch {
      setError("No pudimos leer el archivo. Verifica que sea un CSV en formato UTF-8.")
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    void processFile(event.target.files?.[0])
    event.target.value = ""
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    void processFile(event.dataTransfer.files?.[0])
  }

  function downloadTemplate() {
    const content = [
      "nombre,telefono,fecha,sucursal,total",
      "Cliente de ejemplo,999111222,2026-10-18,Miraflores,48.90",
      "Cliente de muestra,999333444,2026-10-22,San Isidro,72.00",
    ].join("\n")
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "recurra-plantilla.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-stack">
      <div className="page-heading-row">
        <div className="page-heading">
          <span className="page-eyebrow">DATOS DE TU CADENA</span>
          <h1>Sube una base de datos</h1>
          <p>Prueba cómo Recurra leería tus compras y reconocería patrones de recompra.</p>
        </div>
        <Badge variant="secondary" className="demo-data-badge"><Database data-icon="inline-start" aria-hidden="true" /> Solo datos de prueba</Badge>
      </div>

      <div className="data-page-grid">
        <Card className="app-card upload-card">
          <CardHeader className="section-card-header">
            <div>
              <span className="section-kicker">IMPORTACIÓN DE DATOS</span>
              <CardTitle className="section-title">Carga una muestra</CardTitle>
              <p className="card-subtitle">Elige un CSV con compras, teléfono del cliente, fecha y sucursal.</p>
            </div>
            <span className="upload-header-icon"><FileSpreadsheet aria-hidden="true" /></span>
          </CardHeader>
          <CardContent className="upload-content">
            <FieldGroup>
              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="customer-csv">Archivo CSV</FieldLabel>
                <div
                  className={`upload-dropzone ${isDragging ? "is-dragging" : ""}`}
                  onDragOver={(event) => {
                    event.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <span className="upload-icon"><Upload aria-hidden="true" /></span>
                  <span className="upload-title">Arrastra el archivo aquí</span>
                  <span className="upload-or">o selecciona un archivo CSV</span>
                  <Input
                    id="customer-csv"
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleChange}
                    aria-invalid={Boolean(error)}
                    className="upload-file-input"
                  />
                  <span className="upload-limit">CSV · UTF-8 · hasta 5 MB</span>
                </div>
                <FieldDescription>Esta demostración solo procesa el archivo en tu navegador; no lo sube ni lo guarda.</FieldDescription>
                {error ? <FieldError>{error}</FieldError> : null}
              </Field>
            </FieldGroup>

            <div className="upload-template-row">
              <div><strong>¿No tienes un CSV a mano?</strong><span>Descarga una plantilla con datos ficticios.</span></div>
              <Button type="button" variant="outline" onClick={downloadTemplate}>Descargar plantilla</Button>
            </div>

            {uploadSummary ? (
              <div className="upload-result" role="status">
                <div className="upload-result-head"><span className="upload-result-icon"><Check aria-hidden="true" /></span><div><strong>Archivo leído correctamente</strong><span>{uploadSummary.name}</span></div><Badge variant="secondary">Demo</Badge></div>
                <div className="upload-result-stats"><div><span>Filas de compra</span><strong>{uploadSummary.rows.toLocaleString("es-PE")}</strong></div><div><span>Columnas detectadas</span><strong>{uploadSummary.columns.length}</strong></div></div>
                <div className="column-chip-list" aria-label="Columnas detectadas">{uploadSummary.columns.map((column) => <span key={column}>{column}</span>)}</div>
                <p>Los datos solo se han leído en esta sesión. No se incorporaron a la base de clientes.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="data-side-column">
          <Card className="app-card data-profile-card">
            <CardHeader className="section-card-header">
              <div><span className="section-kicker">PERFIL DE LA DEMO</span><CardTitle className="section-title">Botica Salud Total</CardTitle></div>
            </CardHeader>
            <CardContent className="data-profile-list">
              <div><span>Periodo de compras</span><strong>12 meses</strong></div>
              <div><span>Clientes identificados</span><strong>≈ 3,000</strong></div>
              <div><span>Ventas anónimas</span><strong>55%</strong></div>
              <div><span>Sucursales en Lima</span><strong>6</strong></div>
            </CardContent>
          </Card>
          <Card className="data-privacy-card">
            <div className="privacy-icon"><ShieldCheck aria-hidden="true" /></div>
            <div><strong>Privacidad primero</strong><p>Usa datos ficticios en esta prueba. No subas información real de clientes.</p></div>
          </Card>
        </div>
      </div>
    </div>
  )
}
