"use client"

import { useSearchParams } from "next/navigation"
import { useGame } from "@/hooks/useGame"
import { useState } from 'react'
import ConfirmModal from '@/components/game/ConfirmModal'

function GameContent() {

  // initial states
  const [showExitModal, setShowExitModal] = useState(false)

  // initial states
  const {
    currentQuestion, feedback, answered,
    visibleOptions, revealed, gameOver, zoneComplete,
    lives, coins, streak, inventory, currentZone,
    handleAnswer, handleNext, handleUseSword,
    handleUseBow, handleUseVision,
    router, correctCount
  } = useGame()

  // handle modal
  const handleExit = () => {
    setShowExitModal(false)
    router.push("/map")
  }

  // game over
  if (gameOver) {
    router.push("/game-over")
    return null
  }

  // zone complete
  if (zoneComplete) return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in zoom-in-95 duration-700">
      <div className="text-6xl mb-4">✨</div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-zinc-50 uppercase tracking-tight">¡Zona {currentZone} Restaurada!</h1>
        <p className="text-zinc-400 italic">"Has hecho bien, Dev. Los hilos de este sector vuelven a vibrar." — Oryn</p>
      </div>
      <button onClick={() => router.push("/map")} className="btn-primary">Regresar al mapa</button>
    </main>
  )

  // loading
  if (!currentQuestion) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-zinc-500 animate-pulse uppercase tracking-widest text-xs font-bold">Invocando el siguiente desafío...</p>
    </main>
  )

  // render return
  return (
    <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-8 animate-in slide-in-from-left-4 duration-500">
        <div className="glass p-5 rounded-2xl border-zinc-800 space-y-6">
          <div className="space-y-4 text-sm font-medium">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Vidas</span>
              <span className="text-red-400 text-lg">{"❤️".repeat(lives)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Oro</span>
              <span className="text-yellow-500 font-bold text-lg">{coins} 💰</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Racha</span>
              <span className="text-orange-500 font-bold text-lg">🔥 x{streak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Aciertos</span>
              <span className="text-emerald-400 font-bold text-lg">{correctCount}/5</span>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-3">Acceso Rápido</h3>
            <div className="grid grid-cols-2 gap-2">
              <button title="Omitir Desafío" onClick={handleUseSword} disabled={inventory.find(i => i.id === "sword")?.quantity === 0 || answered} className="p-3 glass rounded-lg border-zinc-800 hover:border-zinc-500 disabled:opacity-30 disabled:grayscale transition-all text-xl">🗡️</button>
              <button title="Eliminar Opción" onClick={handleUseBow} disabled={inventory.find(i => i.id === "bow")?.quantity === 0 || answered} className="p-3 glass rounded-lg border-zinc-800 hover:border-zinc-500 disabled:opacity-30 disabled:grayscale transition-all text-xl">🏹</button>
              <button title="Revelar Verdad" onClick={handleUseVision} disabled={inventory.find(i => i.id === "vision")?.quantity === 0 || answered} className="p-3 glass rounded-lg border-zinc-800 hover:border-zinc-500 disabled:opacity-30 disabled:grayscale transition-all text-xl">🔮</button>

              <button
                title="Proteger Alma (automático)"
                disabled={true}
                className="p-3 glass rounded-lg border-zinc-800 disabled:opacity-30 disabled:grayscale transition-all text-xl relative"
              >
                🛡️
                {(inventory.find(i => i.id === "shield")?.quantity ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-zinc-900 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {inventory.find(i => i.id === "shield")?.quantity}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border-zinc-800">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Inventario Completo</p>
          <div className="space-y-2">
            {inventory.map((item) => (
              <div key={item.id} className="flex justify-between text-xs items-center group">
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{item.name}</span>
                <span className="font-mono bg-zinc-800 px-1.5 rounded text-zinc-300">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowExitModal(true)}
          className="w-full py-2 rounded-xl border border-zinc-800 text-zinc-600 hover:text-red-400 hover:border-red-900 transition-all text-[10px] uppercase tracking-widest font-bold"
        >
          Abandonar zona
        </button>
      </aside>

      <section className="lg:col-span-9 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative glass p-8 rounded-3xl border-zinc-800 min-h-[180px] flex flex-col justify-center">
          <div className="absolute -top-3 left-8 bg-zinc-950 px-3 py-1 border border-zinc-800 rounded-full text-[10px] uppercase tracking-widest font-black text-zinc-400">
            Mensaje de Oryn
          </div>
          <p className="text-xl md:text-2xl text-zinc-100 leading-relaxed font-serif italic text-center">
            "{currentQuestion.narrative}"
          </p>
        </div>

        {/* options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleOptions.map((optionIndex) => (
            <button
              key={optionIndex}
              onClick={() => handleAnswer(optionIndex)}
              disabled={answered}
              className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group ${answered
                  ? optionIndex === currentQuestion.correct
                    ? "bg-emerald-950/30 border-emerald-500 text-emerald-400"
                    : "bg-zinc-900/10 border-zinc-900 opacity-40"
                  : revealed && optionIndex === currentQuestion.correct
                    ? "bg-amber-950/30 border-amber-500 text-amber-400"
                    : "glass border-zinc-800 hover:border-zinc-500 active:scale-[0.98]"
                }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${answered && optionIndex === currentQuestion.correct
                ? "bg-emerald-500 border-emerald-400 text-emerald-950"
                : "bg-zinc-800 border-zinc-700 text-zinc-400 group-hover:bg-zinc-700"
                }`}>
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span className="text-lg font-medium">{currentQuestion.options[optionIndex]}</span>
            </button>
          ))}
        </div>

        <div className="h-24 flex items-center justify-center">
          {feedback && (
            <div className="flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <p className={`text-xl font-bold uppercase tracking-tight ${feedback.includes("¡Correcto!") ? "text-emerald-400" :
                feedback.includes("🛡️") ? "text-blue-400" : "text-amber-500"
                }`}>
                {feedback}
              </p>
              {answered && (
                <button onClick={handleNext} className="btn-primary">
                  Siguiente desafío →
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {showExitModal && (
        <ConfirmModal
          title="¿Abandonar la zona?"
          description="Perderás el progreso de esta zona y los items usados no serán recuperados."
          confirmLabel="Sí, abandonar"
          cancelLabel="Seguir jugando"
          onConfirm={handleExit}
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </main>
  )
}

export default function Game() {
  const searchParams = useSearchParams()
  const zone = searchParams.get("zone") ?? "1"
  return <GameContent key={zone} />
}