"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { classes } from "@/data/classes"
import { useGameStore } from "@/store/gameStore"
import { ClassType, ItemId } from "@/types/game"

export default function CharacterSelect() {
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)
  const { setClass, class: playerClass, resetGame } = useGameStore()
  const [selected, setSelected] = useState<ClassType | null>(null)

  const selectedClass = classes.find((c) => c.id === selected)

  const handleConfirm = () => {
    if (!selected || !selectedClass) return
    setClass(selected, selectedClass.starterItemId as ItemId)
    router.push("/map")
  }

  useEffect(() => {
    setHydrated(true)
    if (playerClass) router.push("/map")
  }, [playerClass])

  if (!hydrated) return null
  if (playerClass) return null

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center gap-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-zinc-50 uppercase">The Last Dev</h1>
        <p className="text-zinc-400 text-lg">Elige tu clase para comenzar la aventura en Syntharia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {classes.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`card-action flex flex-col items-center gap-4 text-center ${selected === c.id ? "border-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "border-zinc-800"
              }`}
          >
            <span className="text-6xl mb-2">{c.emoji}</span>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">{c.name}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">{c.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 w-full">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Item inicial</p>
              <p className="text-sm font-medium text-zinc-300">{c.starterItemName}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-24 flex items-center justify-center w-full">
        {selectedClass && (
          <p className="text-center italic text-zinc-300 max-w-xl animate-in fade-in slide-in-from-bottom-2">
            <strong className="text-zinc-100 not-italic uppercase text-xs tracking-wider mr-2">Oryn:</strong>
            "{selectedClass.orynQuote}"
          </p>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selected}
        className="btn-primary w-full md:w-auto"
      >
        Despertar en Syntharia
      </button>
    </main>
  )
}