"use client"

import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/gameStore"

export default function GameOver() {
  const router = useRouter()
  const { resetGame } = useGameStore()

  const handleRestart = () => {
    resetGame()
    router.push("/")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="space-y-4">
        <p className="text-6xl">💀</p>
        <h1 className="text-6xl font-black text-red-500 uppercase tracking-tighter">Game Over</h1>
        <p className="text-zinc-400 text-xl max-w-md">
          Syntharia ha caído en las sombras... el código se ha perdido.
        </p>
      </div>
      <button onClick={handleRestart} className="btn-primary">
        Intentar de nuevo
      </button>
    </main>
  )
}