import { ClassType, ItemId } from "@/types/game"

interface ClassData {
  id: ClassType
  name: string
  emoji: string
  description: string
  orynQuote: string
  starterItemId: ItemId
  starterItemName: string
}

export const classes: ClassData[] = [
  {
    id: "warrior",
    name: "Guerrero",
    emoji: "🛡️",
    description: "Resistencia y defensa ante el error.",
    orynQuote: "El Guerrero... un alma de roca y voluntad. Pocos llegan tan lejos con tanta determinación. Syntharia te necesita.",
    starterItemId: "shield",
    starterItemName: "Escudo de Piedra",
  },
  {
    id: "mage",
    name: "Mago",
    emoji: "🧙",
    description: "Sabiduría para omitir lo desconocido.",
    orynQuote: "El Mago... la mente más afilada del reino. El conocimiento perdido vive en ti. No me decepciones.",
    starterItemId: "sword",
    starterItemName: "Espada de Omisión",
  },
  {
    id: "archer",
    name: "Arquero",
    emoji: "🏹",
    description: "Precisión para revelar la verdad.",
    orynQuote: "El Arquero... ojo certero, corazón tranquilo. Ves lo que otros no ven. Syntharia confía en tu puntería.",
    starterItemId: "scroll",
    starterItemName: "Pergamino del Oráculo",
  },
]