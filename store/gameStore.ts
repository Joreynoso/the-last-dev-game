import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ClassType, GameState, ItemId, ZoneId } from "@/types/game"

/**
 * 🛠️ Acciones del Estado de Juego:
 * - 🧙 setClass: Guarda la clase elegida y otorga el ítem inicial.
 * - 💰 addCoins: Suma monedas tras superar un desafío.
 * - ❤️ loseLife: Resta una vida (mínimo 0).
 * - 🔥 incrementStreak / resetStreak: Gestiona la racha de aciertos.
 * - 🎒 useItem / 🛒 buyItem: Lógica de inventario y transacciones en la tienda.
 * - 🔓 completeZone: Marca progreso y habilita la siguiente región de Syntharia.
 * - ✅ markQuestionAnswered: Registra el historial de desafíos superados.
 * - 🔄 resetGame: Reinicia la aventura al estado original.
 */

const INITIAL_STATE: GameState = {
    class: null,
    lives: 5,
    coins: 0,
    streak: 0,
    currentZone: 1,
    inventory: [
        { id: "sword", name: "Espada de Omisión", description: "Saltás 1 pregunta", cost: 30, quantity: 0 },
        { id: "bow", name: "Arco Certero", description: "Eliminás 1 opción incorrecta", cost: 50, quantity: 0 },
        { id: "vision", name: "Visión Arcana", description: "Revelás la respuesta correcta", cost: 80, quantity: 0 },
        { id: "shield", name: "Escudo de Piedra", description: "Absorbés 1 fallo sin perder vida", cost: 40, quantity: 0 },
    ],
    zonesStatus: [
        { id: 1, name: "Bosque de los Primeros Hechizos", unlocked: true, completed: false },
        { id: 2, name: "Montañas del Código Perdido", unlocked: false, completed: false },
        { id: 3, name: "Aldea del Compilador Roto", unlocked: false, completed: false },
        { id: 4, name: "Volcán de los Bugs Eternos", unlocked: false, completed: false },
        { id: 5, name: "Castillo del Kernel Oscuro", unlocked: false, completed: false },
    ],
    answeredQuestions: [],
}

interface GameStore extends GameState {
    setClass: (classType: ClassType, starterItemId: ItemId) => void
    addCoins: (amount: number) => void
    loseLife: () => void
    incrementStreak: () => void
    resetStreak: () => void
    useItem: (itemId: ItemId) => void
    buyItem: (itemId: ItemId) => void
    completeZone: (zoneId: ZoneId) => void
    markQuestionAnswered: (questionId: string) => void
    resetGame: () => void
    setCurrentZone: (zoneId: ZoneId) => void
}

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,

            setClass: (classType, starterItemId) =>
                set((state) => ({
                    class: classType,
                    inventory: state.inventory.map((item) =>
                        item.id === starterItemId ? { ...item, quantity: 1 } : item
                    ),
                })),

            addCoins: (amount) =>
                set((state) => ({ coins: state.coins + amount })),

            loseLife: () =>
                set((state) => ({ lives: Math.max(0, state.lives - 1) })),

            incrementStreak: () =>
                set((state) => ({ streak: state.streak + 1 })),

            resetStreak: () =>
                set({ streak: 0 }),

            useItem: (itemId) =>
                set((state) => ({
                    inventory: state.inventory.map((item) =>
                        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
                    ),
                })),

            buyItem: (itemId) =>
                set((state) => {
                    const item = state.inventory.find((i) => i.id === itemId)
                    if (!item || state.coins < item.cost) return state
                    return {
                        coins: state.coins - item.cost,
                        inventory: state.inventory.map((i) =>
                            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    }
                }),

            completeZone: (zoneId) =>
                set((state) => ({
                    zonesStatus: state.zonesStatus.map((zone) => {
                        if (zone.id === zoneId) return { ...zone, completed: true }
                        if (zone.id === zoneId + 1) return { ...zone, unlocked: true }
                        return zone
                    }),
                })),

            markQuestionAnswered: (questionId) =>
                set((state) => ({
                    answeredQuestions: [...state.answeredQuestions, questionId],
                })),

            resetGame: () => {
                localStorage.removeItem("the-last-dev-storage")
                set(INITIAL_STATE)
            },

            setCurrentZone: (zoneId) => set({ currentZone: zoneId }),
        }),
        { name: "game-store" }
    )
)