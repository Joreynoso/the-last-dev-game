"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/gameStore"
import ShopPanel from '@/components/map/ShopPanel'
import { ZoneId, ZoneStatus } from '@/types/game'
import ConfirmModal from '@/components/game/ConfirmModal'

export default function Map() {
  const [showResetModal, setShowResetModal] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const router = useRouter()
  const { zonesStatus, currentZone, lives, coins, class: playerClass, setCurrentZone, resetGame } = useGameStore()

  const handleZoneClick = (zone: ZoneStatus) => {
    if (!zone.unlocked || zone.completed) return
    setCurrentZone(zone.id as ZoneId)
    router.push(`/game?zone=${zone.id}`)
  }

  const handleReset = () => {
    resetGame()
    setShowResetModal(false)
    router.push("/")
  }

  useEffect(() => {
    setHydrated(true)
    if (!playerClass) router.push("/")
  }, [playerClass])

  if (!hydrated) return null
  if (!playerClass) return null
  if (lives <= 0) {
    router.push("/game-over")
    return null
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <header className="flex justify-between items-center glass p-4 rounded-xl border-zinc-800">
        <div className="flex gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Clase</span>
            <span className="text-zinc-100 capitalize">{playerClass}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Vidas</span>
            <span className="text-red-400 font-bold">{"❤️".repeat(lives)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Monedas</span>
            <span className="text-yellow-500 font-bold">{coins} 💰</span>
          </div>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-red-400 font-bold transition-colors"
        >
          Comenzar de nuevo
        </button>
      </header>

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-zinc-50 uppercase">Mapa de Syntharia</h1>
        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Selecciona una región para continuar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {zonesStatus.map((zone) => (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone)}
            className={`p-6 rounded-xl border transition-all flex flexacol justify-between h-40 ${zone.unlocked
              ? "glass border-zinc-800 cursor-pointer hover:border-zinc-500 active:scale-[0.98]"
              : "bg-zinc-900/20 border-zinc-900 opacity-60 grayscale cursor-not-allowed"
              } ${zone.id === currentZone ? "ring-2 ring-zinc-100 ring-offset-4 ring-offset-zinc-950" : ""}`}
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Zona {zone.id}</p>
              <h2 className="text-lg font-bold text-zinc-100">{zone.name}</h2>
            </div>

            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              {zone.unlocked ? (
                zone.completed ? (
                  <span className="text-emerald-400 flex items-center gap-1">✅ Completada</span>
                ) : (
                  <span className="text-zinc-100 flex items-center gap-1">▶ Jugar</span>
                )
              ) : (
                <span className="text-zinc-600 flex items-center gap-1">🔒 Bloqueada</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* shop zone */}
      <div className="glass border border-zinc-800 rounded-xl p-6">
        <ShopPanel />
      </div>

      {/* modal reset */}
      {showResetModal && (
        <ConfirmModal
          title="¿Reiniciar partida?"
          description="Perderás todo tu progreso y comenzarás de nuevo."
          confirmLabel="Sí, reiniciar"
          cancelLabel="Cancelar"
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </main>
  )
}