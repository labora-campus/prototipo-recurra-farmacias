export type AppSection = "resumen" | "clientes" | "sucursales" | "campanas" | "datos"

export type Branch = {
  id: string
  name: string
  district: string
  lat: number
  lng: number
  monthlyCustomers: number
  monthlySales: number
  riskCustomers: number
  averageTicket: number
}

export type Customer = {
  id: string
  name: string
  initials: string
  lastPurchase: string
  daysSincePurchase: number
  usualCycleDays: number
  purchases12m: number
  averageTicket: number
  risk: "Alto" | "Medio"
  riskScore: number
  branchId: string
  category: string
  reasons: string[]
}

export type UploadSummary = {
  name: string
  rows: number
  columns: string[]
}

export const BRANCHES: Branch[] = [
  {
    id: "miraflores",
    name: "Miraflores",
    district: "Miraflores",
    lat: -12.1217,
    lng: -77.0291,
    monthlyCustomers: 612,
    monthlySales: 38400,
    riskCustomers: 28,
    averageTicket: 63,
  },
  {
    id: "san-isidro",
    name: "San Isidro",
    district: "San Isidro",
    lat: -12.0974,
    lng: -77.0365,
    monthlyCustomers: 584,
    monthlySales: 42100,
    riskCustomers: 24,
    averageTicket: 72,
  },
  {
    id: "surco",
    name: "Surco",
    district: "Santiago de Surco",
    lat: -12.1358,
    lng: -76.9917,
    monthlyCustomers: 538,
    monthlySales: 35700,
    riskCustomers: 31,
    averageTicket: 66,
  },
  {
    id: "san-borja",
    name: "San Borja",
    district: "San Borja",
    lat: -12.1014,
    lng: -76.9962,
    monthlyCustomers: 492,
    monthlySales: 32900,
    riskCustomers: 26,
    averageTicket: 61,
  },
  {
    id: "los-olivos",
    name: "Los Olivos",
    district: "Los Olivos",
    lat: -11.9887,
    lng: -77.0701,
    monthlyCustomers: 456,
    monthlySales: 29400,
    riskCustomers: 39,
    averageTicket: 57,
  },
  {
    id: "san-juan",
    name: "San Juan de Lurigancho",
    district: "San Juan de Lurigancho",
    lat: -12.0053,
    lng: -76.9952,
    monthlyCustomers: 402,
    monthlySales: 26100,
    riskCustomers: 38,
    averageTicket: 55,
  },
]

export const RISK_CUSTOMERS: Customer[] = [
  {
    id: "maria-ruiz",
    name: "María Fernanda Ruiz",
    initials: "MR",
    lastPurchase: "13 oct 2026",
    daysSincePurchase: 23,
    usualCycleDays: 11,
    purchases12m: 14,
    averageTicket: 72,
    risk: "Alto",
    riskScore: 86,
    branchId: "miraflores",
    category: "Cuidado personal",
    reasons: [
      "Lleva 23 días sin comprar; su ritmo habitual es cada 11 días.",
      "Ya pasó su fecha estimada de recompra por 12 días.",
      "En los últimos 3 meses visitó con menor frecuencia que antes.",
    ],
  },
  {
    id: "jose-paredes",
    name: "José Luis Paredes",
    initials: "JP",
    lastPurchase: "17 oct 2026",
    daysSincePurchase: 19,
    usualCycleDays: 12,
    purchases12m: 18,
    averageTicket: 58,
    risk: "Alto",
    riskScore: 79,
    branchId: "san-isidro",
    category: "Higiene personal",
    reasons: [
      "Lleva 19 días sin comprar; normalmente vuelve cada 12 días.",
      "Su última visita fue 7 días después de la fecha esperada.",
      "Ha mantenido compras regulares durante 8 meses seguidos.",
    ],
  },
  {
    id: "lucia-quispe",
    name: "Lucía Quispe Salazar",
    initials: "LQ",
    lastPurchase: "20 oct 2026",
    daysSincePurchase: 16,
    usualCycleDays: 9,
    purchases12m: 21,
    averageTicket: 46,
    risk: "Alto",
    riskScore: 74,
    branchId: "surco",
    category: "Cuidado personal",
    reasons: [
      "Lleva 16 días sin comprar; suele regresar cada 9 días.",
      "Su ciclo actual es casi el doble de su frecuencia habitual.",
      "La mayoría de sus compras se concentran en una misma sucursal.",
    ],
  },
  {
    id: "carlos-mendoza",
    name: "Carlos Mendoza Ríos",
    initials: "CM",
    lastPurchase: "22 oct 2026",
    daysSincePurchase: 14,
    usualCycleDays: 10,
    purchases12m: 12,
    averageTicket: 81,
    risk: "Medio",
    riskScore: 63,
    branchId: "san-borja",
    category: "Cuidado personal",
    reasons: [
      "Lleva 14 días sin comprar; suele regresar cada 10 días.",
      "Su última compra fue más pequeña que su promedio habitual.",
      "Aún está dentro de un margen recuperable según su historial.",
    ],
  },
  {
    id: "ana-torres",
    name: "Ana Torres Valdivia",
    initials: "AT",
    lastPurchase: "24 oct 2026",
    daysSincePurchase: 12,
    usualCycleDays: 8,
    purchases12m: 16,
    averageTicket: 54,
    risk: "Medio",
    riskScore: 58,
    branchId: "los-olivos",
    category: "Higiene personal",
    reasons: [
      "Lleva 12 días sin comprar; su ritmo habitual es cada 8 días.",
      "Su fecha estimada de recompra pasó hace 4 días.",
      "Sus compras se mantienen, aunque con intervalos un poco más largos.",
    ],
  },
]

export const MONTHLY_PURCHASES = [
  { month: "Dic", orders: 642 },
  { month: "Ene", orders: 688 },
  { month: "Feb", orders: 671 },
  { month: "Mar", orders: 724 },
  { month: "Abr", orders: 698 },
  { month: "May", orders: 762 },
  { month: "Jun", orders: 741 },
  { month: "Jul", orders: 793 },
  { month: "Ago", orders: 818 },
  { month: "Sep", orders: 781 },
  { month: "Oct", orders: 846 },
  { month: "Nov", orders: 274 },
]

export const COMPLETED_CAMPAIGNS = [
  {
    id: "octubre",
    name: "Un detalle para volver",
    date: "14 oct 2026",
    audience: 324,
    returns: 64,
    revenue: 6480,
    returnRate: 19.8,
  },
  {
    id: "septiembre",
    name: "Te esperamos de vuelta",
    date: "16 sep 2026",
    audience: 286,
    returns: 48,
    revenue: 4920,
    returnRate: 16.8,
  },
]

export function formatSoles(amount: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getBranchById(id: string) {
  return BRANCHES.find((branch) => branch.id === id) ?? BRANCHES[0]
}
