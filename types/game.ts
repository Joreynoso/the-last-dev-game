export type ClassType = "warrior" | "mage" | "archer"

export type ZoneId = 1 | 2 | 3 | 4 | 5

export type Difficulty = "easy" | "medium" | "hard"

export type ItemId =
  | "sword"      // Espada de Omisión
  | "bow"        // Arco Certero
  | "vision"     // Visión Arcana
  | "shield"     // Escudo de Piedra

export interface Item {
  id: ItemId
  name: string
  description: string
  cost: number
  quantity: number
}

export interface Question {
  id: string
  zone: ZoneId
  narrative: string
  options: string[]
  correct: number
  difficulty: Difficulty
}

export interface ZoneStatus {
  id: ZoneId
  name: string
  unlocked: boolean
  completed: boolean
}

export interface GameState {
  class: ClassType | null
  lives: number
  coins: number
  streak: number
  currentZone: ZoneId
  inventory: Item[]
  zonesStatus: ZoneStatus[]
  answeredQuestions: string[]
}