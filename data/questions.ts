import { Question } from "@/types/game"

export const questions: Question[] = [

  // ── Zona 1 — Bosque de los Primeros Hechizos ──────────────────
  {
    id: "z1_q1", zone: 1, difficulty: "easy",
    narrative: "El Puente de Cristal conecta el castillo con las aldeas del norte. El hechizo necesita calcular distancias entre puntos. ¿Qué tipo de dato invocas?",
    options: ["String", "Integer", "Boolean", "Array"],
    correct: 1,
  },
  {
    id: "z1_q2", zone: 1, difficulty: "easy",
    narrative: "La puerta del Bosque solo se abre si el viajero ha pagado el peaje. El guardián necesita saber si pagó o no. ¿Qué tipo de dato usa el hechizo?",
    options: ["Integer", "String", "Boolean", "Float"],
    correct: 2,
  },
  {
    id: "z1_q3", zone: 1, difficulty: "easy",
    narrative: "El árbol ancestral guarda los nombres de los últimos magos. Cada nombre es una secuencia de caracteres. ¿Qué tipo de dato los representa?",
    options: ["Boolean", "Integer", "Array", "String"],
    correct: 3,
  },
  {
    id: "z1_q4", zone: 1, difficulty: "easy",
    narrative: "El río Synthar tiene 3 afluentes. El hechizo debe recorrerlos uno por uno. ¿Qué estructura de datos usarías para guardarlos?",
    options: ["String", "Boolean", "Array", "Integer"],
    correct: 2,
  },
  {
    id: "z1_q5", zone: 1, difficulty: "easy",
    narrative: "El hechicero necesita repetir un conjuro exactamente 5 veces. ¿Qué estructura de control invocarías?",
    options: ["if / else", "switch", "for loop", "try / catch"],
    correct: 2,
  },

  // ── Zona 2 — Montañas del Código Perdido ──────────────────────
  {
    id: "z2_q1", zone: 2, difficulty: "easy",
    narrative: "En las cumbres heladas, dos caminos se bifurcan. El hechizo debe elegir uno según una condición. ¿Qué estructura usás?",
    options: ["for loop", "if / else", "Array", "while"],
    correct: 1,
  },
  {
    id: "z2_q2", zone: 2, difficulty: "medium",
    narrative: "El eco de las montañas repite un conjuro hasta que el viento cesa. No sabes cuántas veces ocurrirá. ¿Qué estructura de control es la correcta?",
    options: ["for loop", "switch", "while loop", "if / else"],
    correct: 2,
  },
  {
    id: "z2_q3", zone: 2, difficulty: "medium",
    narrative: "El mapa de la montaña guarda pares de nombre y ubicación. Necesitás acceder a una ubicación por su nombre. ¿Qué estructura usás?",
    options: ["Array", "Boolean", "Object / Map", "String"],
    correct: 2,
  },
  {
    id: "z2_q4", zone: 2, difficulty: "medium",
    narrative: "El conjuro falla y lanza un error inesperado. ¿Qué estructura usás para atraparlo sin que el hechizo explote?",
    options: ["if / else", "try / catch", "switch", "for loop"],
    correct: 1,
  },
  {
    id: "z2_q5", zone: 2, difficulty: "medium",
    narrative: "El oráculo de la cima devuelve un valor después de mucho tiempo. La aldea no puede esperar bloqueada. ¿Cómo manejas esa espera en código?",
    options: ["Con un Array", "Con un Boolean", "Con async / await", "Con un switch"],
    correct: 2,
  },

  // ── Zona 3 — Aldea del Compilador Roto ────────────────────────
  {
    id: "z3_q1", zone: 3, difficulty: "medium",
    narrative: "El herrero de la aldea crea espadas con la misma forma pero distinto material. ¿Qué concepto de programación representa esto?",
    options: ["Variable", "Función", "Clase / Objeto", "Array"],
    correct: 2,
  },
  {
    id: "z3_q2", zone: 3, difficulty: "medium",
    narrative: "El compilador roto repite código en cada hechizo. El sabio dice que deberías encapsular esa lógica y reutilizarla. ¿Qué usás?",
    options: ["Una variable", "Una función", "Un Array", "Un Boolean"],
    correct: 1,
  },
  {
    id: "z3_q3", zone: 3, difficulty: "medium",
    narrative: "El mensajero de la aldea lleva una carta y espera respuesta antes de continuar. ¿Qué tipo de función representa esto?",
    options: ["Función sincrónica", "Función async", "Arrow function", "Función pura"],
    correct: 1,
  },
  {
    id: "z3_q4", zone: 3, difficulty: "medium",
    narrative: "El alquimista mezcla ingredientes pero nunca modifica los originales. Siempre devuelve una nueva poción. ¿Qué concepto aplica?",
    options: ["Mutación de estado", "Función pura", "Efecto secundario", "Closure"],
    correct: 1,
  },
  {
    id: "z3_q5", zone: 3, difficulty: "hard",
    narrative: "La caja mágica recuerda el valor que tenía cuando fue creada, incluso después de que el hechizo terminó. ¿Qué concepto es ese?",
    options: ["Callback", "Promesa", "Closure", "Async / Await"],
    correct: 2,
  },

  // ── Zona 4 — Volcán de los Bugs Eternos ───────────────────────
  {
    id: "z4_q1", zone: 4, difficulty: "hard",
    narrative: "El volcán muta sin control. Cada hechizo cambia el estado global y nadie sabe qué pasó. ¿Qué principio se está violando?",
    options: ["DRY", "Inmutabilidad", "Tipado estático", "Modularidad"],
    correct: 1,
  },
  {
    id: "z4_q2", zone: 4, difficulty: "hard",
    narrative: "Dos hechizos dependen uno del otro formando un círculo sin fin. El programa nunca termina. ¿Cómo se llama este problema?",
    options: ["Race condition", "Memory leak", "Dependencia circular", "Stack overflow"],
    correct: 2,
  },
  {
    id: "z4_q3", zone: 4, difficulty: "hard",
    narrative: "El guardián del volcán llama a su propio hechizo dentro de sí mismo, sin condición de parada. ¿Qué ocurre?",
    options: ["Retorna undefined", "Stack overflow por recursión infinita", "Lanza un warning", "Se ejecuta una sola vez"],
    correct: 1,
  },
  {
    id: "z4_q4", zone: 4, difficulty: "hard",
    narrative: "El hechizo promete traer agua del río, pero el río está seco. ¿Cómo manejás ese caso en una Promise?",
    options: [".then()", ".catch()", ".finally()", ".resolve()"],
    correct: 1,
  },
  {
    id: "z4_q5", zone: 4, difficulty: "hard",
    narrative: "Dos conjuros corren al mismo tiempo y ambos modifican el mismo valor. El resultado es impredecible. ¿Cómo se llama este problema?",
    options: ["Closure", "Race condition", "Stack overflow", "Deadlock"],
    correct: 1,
  },

  // ── Zona 5 — Castillo del Kernel Oscuro ───────────────────────
  {
    id: "z5_q1", zone: 5, difficulty: "hard",
    narrative: "El Kernel Oscuro separa cada responsabilidad en su propio módulo. Ninguno sabe demasiado del otro. ¿Qué principio sigue?",
    options: ["DRY", "Separation of concerns", "YAGNI", "Inmutabilidad"],
    correct: 1,
  },
  {
    id: "z5_q2", zone: 5, difficulty: "hard",
    narrative: "El castillo tiene una entrada única para todo visitante. Centraliza el acceso y distribuye desde ahí. ¿Qué patrón arquitectónico es?",
    options: ["Observer", "Singleton", "API Gateway / Entry point", "Factory"],
    correct: 2,
  },
  {
    id: "z5_q3", zone: 5, difficulty: "hard",
    narrative: "El hechizo final transforma cada elemento de un ejército aplicándoles la misma operación. ¿Qué método de array usás?",
    options: [".filter()", ".reduce()", ".map()", ".find()"],
    correct: 2,
  },
  {
    id: "z5_q4", zone: 5, difficulty: "hard",
    narrative: "El guardián solo deja pasar a los soldados que cumplen una condición. Devuelve un nuevo ejército reducido. ¿Qué método usás?",
    options: [".map()", ".filter()", ".reduce()", ".forEach()"],
    correct: 1,
  },
  {
    id: "z5_q5", zone: 5, difficulty: "hard",
    narrative: "El hechizo final acumula el poder de todos los guerreros en un único valor total. ¿Qué método de array invocás?",
    options: [".map()", ".filter()", ".find()", ".reduce()"],
    correct: 3,
  },
]

export const getQuestionsByZone = (zone: number): Question[] =>
  questions.filter((q) => q.zone === zone)