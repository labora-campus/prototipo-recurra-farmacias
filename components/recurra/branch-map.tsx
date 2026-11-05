"use client"

import { useEffect, useRef } from "react"
import { divIcon } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { BRANCHES, formatSoles } from "./data"
import type { Branch } from "./data"

type BranchMapProps = {
  selectedBranch: Branch
  onSelectBranch: (branch: Branch) => void
}

function SelectedBranchFocus({ branch }: { branch: Branch }) {
  const map = useMap()
  const previousId = useRef(branch.id)

  useEffect(() => {
    if (previousId.current !== branch.id) {
      map.flyTo([branch.lat, branch.lng], 13, { duration: 0.65 })
      previousId.current = branch.id
    }
  }, [branch.id, branch.lat, branch.lng, map])

  return null
}

function branchMarkerIcon(isSelected: boolean) {
  return divIcon({
    className: "branch-map-icon",
    html: `<span class="branch-marker ${isSelected ? "branch-marker-active" : ""}"><span class="branch-marker-core"></span></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  })
}

export default function BranchMap({ selectedBranch, onSelectBranch }: BranchMapProps) {
  return (
    <div className="map-canvas">
      <MapContainer
        center={[-12.055, -77.025]}
        zoom={10.8}
        minZoom={10}
        maxZoom={17}
        scrollWheelZoom={false}
        className="leaflet-map"
        aria-label="Mapa de las seis sucursales de Botica Salud Total en Lima"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SelectedBranchFocus branch={selectedBranch} />
        {BRANCHES.map((branch) => (
          <Marker
            key={branch.id}
            position={[branch.lat, branch.lng]}
            title={`Botica Salud Total ${branch.name}`}
            alt={`Sucursal ${branch.name}`}
            icon={branchMarkerIcon(branch.id === selectedBranch.id)}
            eventHandlers={{ click: () => onSelectBranch(branch) }}
          >
            <Popup>
              <div className="map-popup">
                <strong>{branch.name}</strong>
                <span>{branch.district}</span>
                <span>{branch.monthlyCustomers} clientes este mes · {formatSoles(branch.monthlySales)}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
