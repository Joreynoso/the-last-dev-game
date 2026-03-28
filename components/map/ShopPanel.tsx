"use client"

import { useGameStore } from "@/store/gameStore"

export default function ShopPanel() {
  const { inventory, coins, buyItem } = useGameStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-widest">Tienda de Oryn</h2>
        <span className="text-yellow-500 font-bold text-sm">{coins} 💰</span>
      </div>

      <p className="text-zinc-500 text-xs italic">
        "Lo que necesitas para sobrevivir... por un precio justo."
      </p>

      <div className="grid grid-cols-1 gap-3">
        {inventory.map((item) => {
          const canAfford = coins >= item.cost

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-100">{item.name}</p>
                <p className="text-xs text-zinc-500">{item.description}</p>
                <p className="text-xs text-zinc-600">En inventario: x{item.quantity}</p>
              </div>

              <button
                onClick={() => buyItem(item.id)}
                disabled={!canAfford}
                className={`ml-4 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  canAfford
                    ? "bg-yellow-500 text-zinc-900 hover:bg-yellow-400 active:scale-95"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                {item.cost} 💰
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}