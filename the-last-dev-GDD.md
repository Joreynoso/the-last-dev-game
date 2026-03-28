# The Last Dev — Game Design Document

> Documento de diseño generalizado. Sin código. Sirve como punto de partida para el desarrollo.
> Versión 2.0 — Actualizado con mapa, 3 pantallas y fases de desarrollo.

---

## 1. Concepto

**The Last Dev** es un minijuego RPG educativo donde el jugador asume el rol del último desarrollador de **Syntharia**, un reino mágico donde la magia es código. El conocimiento se perdió y el mundo se apaga. Solo el jugador puede restaurarlo respondiendo desafíos lógicos envueltos en narrativa de fantasía clásica.

Un agente IA llamado **Oryn** actúa como familiar/narrador. Reacciona a cada respuesta, recuerda el historial de la sesión y adapta su comportamiento según el desempeño del jugador.

---

## 2. Objetivo del proyecto

- Demostrar el uso de agentes IA con memoria y herramientas (MCP)
- Integrar un LLM (Groq) de forma narrativa y funcional
- Construir un producto jugable, con identidad visual y rejugabilidad
- Servir como tercer proyecto de portafolio con tecnologías de vanguardia

---

## 3. Stack tecnológico

| Tecnología | Rol |
|---|---|
| Next.js + TypeScript | Framework fullstack |
| Groq SDK (LLaMA) | LLM que da vida a Oryn |
| Vercel AI SDK | Manejo del agente y tools MCP |
| Tailwind CSS + shadcn/ui | UI y componentes |
| Framer Motion | Animaciones (fase final) |
| localStorage / estado de sesión | Memoria del agente, sin base de datos |

---

## 4. Clases iniciales

El jugador elige una de tres clases al inicio. Cada clase incluye un item de un solo uso que define su ventaja de arranque. Al seleccionar una clase, Oryn narra una descripción personalizada del personaje elegido.

| Clase | Item inicial | Efecto |
|---|---|---|
| 🛡️ Guerrero | Escudo de Piedra | Absorbés 1 fallo sin perder vida |
| 🧙 Mago | Espada de Omisión | Saltás 1 pregunta sin penalización |
| 🏹 Arquero | Visión Arcana | Revelás la respuesta correcta |

- Cada item inicial es de **un solo uso**
- La clase no afecta las estadísticas base, solo el item de inicio
- Oryn reacciona narrativamente con una descripción diferente para cada clase

---

## 5. Los 5 escenarios de Syntharia

El mapa es la pantalla principal del juego. Las zonas se desbloquean de forma lineal al completar todas las preguntas de la zona anterior. La primera zona siempre está disponible al comenzar.

| # | Zona | Ambiente | Estado inicial |
|---|---|---|---|
| 1 | 🌲 Bosque de los Primeros Hechizos | Bosque mágico, árboles brillantes | Desbloqueado |
| 2 | 🏔️ Montañas del Código Perdido | Picos nevados, runas en las rocas | Bloqueado |
| 3 | 🏚️ Aldea del Compilador Roto | Pueblo en ruinas, magia inestable | Bloqueado |
| 4 | 🌋 Volcán de los Bugs Eternos | Lava, caos, errores del pasado | Bloqueado |
| 5 | 🏰 Castillo del Kernel Oscuro | Fortaleza final, origen del problema | Bloqueado |

---

## 6. Las 3 pantallas del juego

### Pantalla 1 — Selección de personaje
- El jugador ve las 3 clases disponibles con su item inicial
- Al seleccionar una clase, Oryn narra una descripción épica del personaje
- Al confirmar, se guarda la clase en el estado de sesión y se avanza al mapa

### Pantalla 2 — Mapa del reino (pantalla principal)
- Fondo tipo ilustración completa del reino de Syntharia
- 5 nodos/ubicaciones conectados por un camino
- Los nodos bloqueados se ven oscurecidos con ícono de candado
- El nodo activo (jugable) está resaltado
- Al tocar el nodo activo, se entra a la pantalla de juego
- Barra superior con nombre de clase, monedas y vidas

### Pantalla 3 — Pantalla de juego
- **Barra lateral izquierda flotante** con:
  - Avatar e ícono de clase
  - Nombre de clase y zona actual
  - Vidas (corazones visuales)
  - Monedas acumuladas
  - Racha actual
  - Inventario completo con cantidad de cada item
  - Acceso rápido: slots de items para usar con un click
- **Área principal** con:
  - Narración de Oryn (situación del desafío)
  - 4 opciones de respuesta
  - Reacción de Oryn tras la respuesta

---

## 7. Sistema de vida y progresión

### Vida
- El jugador comienza con **5 vidas**
- Cada respuesta incorrecta resta **1 vida**
- Al llegar a 0 vidas, la partida termina (game over)
- No hay forma de recuperar vidas durante la partida

### Progresión de zonas
- Cada zona tiene una cantidad fija de preguntas (sugerido: 5 por zona)
- Completar todas las preguntas de una zona desbloquea la siguiente en el mapa
- Completar las 5 zonas = victoria

---

## 8. Sistema de monedas

### Ganancia

| Acción | Monedas |
|---|---|
| Respuesta correcta | +10 |
| Racha de 3 respuestas seguidas | +25 bonus |
| Respuesta incorrecta | 0 (y -1 vida) |

### Uso
Las monedas se gastan en la **Tienda de Oryn** para comprar items antes o durante la partida.

---

## 9. Tienda de items

| Item | Costo | Efecto |
|---|---|---|
| 🗡️ Espada de Omisión | 30 💰 | Saltás 1 pregunta sin penalización |
| 🏹 Arco Certero | 50 💰 | Eliminás 1 opción incorrecta visible |
| 🔮 Visión Arcana | 80 💰 | Revelás la respuesta correcta |
| 🛡️ Escudo de Piedra | 40 💰 | Absorbés 1 fallo sin perder vida |

- Cada item comprado es de **un solo uso**
- Se pueden comprar múltiples unidades del mismo item
- Oryn reacciona narrativamente cuando el jugador usa un item

---

## 10. Inventario

- **Inventario completo**: panel en la barra lateral izquierda, visible siempre durante el juego. Muestra todos los items con su cantidad disponible
- **Acceso rápido**: slots en la parte inferior de la barra lateral. Hasta 3 items equipados para usar con un solo click

---

## 11. Agente Oryn — comportamiento

Oryn es el corazón narrativo del juego. No es un chatbot, es un agente con memoria y herramientas.

### Personalidad
- Sabio, antiguo, con humor sutil
- Habla en tono épico/narrativo, como un libro de fantasía
- Se adapta emocionalmente al rendimiento del jugador

### Comportamiento según situación

| Situación | Reacción de Oryn |
|---|---|
| Selección de clase | Narra una descripción épica del personaje elegido |
| Respuesta correcta | Avanza la historia con emoción y otorga monedas |
| Respuesta incorrecta | Explica el concepto en tono de lore, recuerda errores previos |
| Varios errores seguidos | Se vuelve más didáctico y pausado |
| Racha de aciertos | Reacciona con orgullo, sube la intensidad narrativa |
| Uso de un item | Describe la acción del item con dramatismo épico |
| Zona completada | Celebra el avance y presenta la siguiente zona |
| Game over | Despedida narrativa, invita a intentarlo de nuevo |

### Memoria del agente
- Oryn recuerda las respuestas de la sesión actual
- Usa ese historial para adaptar pistas y tono
- La memoria no persiste entre sesiones (estado local)

### MCP Tool: `get_challenge()`
- El agente llama a esta tool para obtener el siguiente desafío
- La tool recibe el historial del jugador y devuelve una pregunta adecuada al nivel
- Esto convierte a Oryn en un agente real, no solo una# The Last Dev — Game Design Document

> Versión 3.0 — Estado actual del proyecto al día de hoy.
> Refleja decisiones de diseño y técnicas tomadas durante el desarrollo.

---

## 1. Concepto

**The Last Dev** es un minijuego RPG educativo donde el jugador asume el rol del último desarrollador de **Syntharia**, un reino mágico donde la magia es código. El conocimiento se perdió y el mundo se apaga. Solo el jugador puede restaurarlo respondiendo desafíos lógicos envueltos en narrativa de fantasía clásica.

Un agente IA llamado **Oryn** actúa como familiar/narrador. Reacciona a cada respuesta y adapta su comportamiento según el desempeño del jugador.

---

## 2. Stack tecnológico

| Tecnología | Rol |
|---|---|
| Next.js + TypeScript | Framework fullstack |
| Zustand + persist | Estado global persistido en localStorage |
| Groq SDK (LLaMA) | LLM que dará vida a Oryn (Fase 2) |
| Vercel AI SDK | Manejo del agente y tools MCP (Fase 2) |
| Tailwind CSS + shadcn/ui | UI y componentes |
| Framer Motion | Animaciones (Fase 3) |

---

## 3. Estructura del proyecto

```
the-last-dev/
├── app/
│   ├── page.tsx              ← Pantalla 1 (selección de clase)
│   ├── map/
│   │   └── page.tsx          ← Pantalla 2 (mapa)
│   └── game/
│       └── page.tsx          ← Pantalla 3 (juego)
├── components/
│   ├── character-select/
│   ├── map/
│   │   └── ShopPanel.tsx     ← Tienda de items
│   └── game/
├── data/
│   ├── questions.ts          ← 25 preguntas hardcodeadas
│   └── classes.ts            ← Datos de las 3 clases
├── hooks/
│   └── useGame.ts            ← Lógica completa del juego
├── store/
│   └── gameStore.ts          ← Estado global con Zustand + persist
└── types/
    └── game.ts               ← Tipos TypeScript del proyecto
```

---

## 4. Tipos TypeScript

```ts
type ClassType = "warrior" | "mage" | "archer"
type ZoneId = 1 | 2 | 3 | 4 | 5
type Difficulty = "easy" | "medium" | "hard"
type ItemId = "sword" | "bow" | "vision" | "shield"
```

---

## 5. Clases iniciales

| Clase | Item inicial | Efecto |
|---|---|---|
| 🛡️ Guerrero | Escudo de Piedra | Absorbe automáticamente 1 fallo |
| 🧙 Mago | Espada de Omisión | Saltás 1 pregunta sin penalización |
| 🏹 Arquero | Visión Arcana | Revelás la respuesta correcta |

- Cada item inicial es de un solo uso
- Al elegir clase el juego se resetea completamente
- Oryn narra una descripción épica del personaje elegido

---

## 6. Los 5 escenarios de Syntharia

| # | Zona | Estado inicial |
|---|---|---|
| 1 | 🌲 Bosque de los Primeros Hechizos | Desbloqueado |
| 2 | 🏔️ Montañas del Código Perdido | Bloqueado |
| 3 | 🏚️ Aldea del Compilador Roto | Bloqueado |
| 4 | 🌋 Volcán de los Bugs Eternos | Bloqueado |
| 5 | 🏰 Castillo del Kernel Oscuro | Bloqueado |

---

## 7. Las 3 pantallas

### Pantalla 1 — Selección de clase
- Si ya hay clase guardada → redirige automáticamente al mapa
- Muestra las 3 clases con su item inicial
- Al seleccionar, Oryn narra la descripción del personaje
- Al confirmar, resetea el estado y navega al mapa

### Pantalla 2 — Mapa del reino
- Muestra las 5 zonas con su estado (desbloqueada / bloqueada / completada)
- Botón "Comenzar de nuevo" que resetea todo el juego
- Panel de tienda para comprar items entre zonas
- Si no hay clase guardada → redirige al inicio

### Pantalla 3 — Pantalla de juego
- Barra lateral izquierda: vidas, monedas, racha, inventario, acceso rápido
- Área principal: narración de Oryn, 4 opciones, feedback
- Si no hay clase guardada → redirige al inicio
- Contador de aciertos visible durante la partida

---

## 8. Lógica de zonas

### Para superar una zona
- Responder al menos 4 de 5 preguntas correctamente
- Tener al menos 1 vida al finalizar

### Si no se cumplen las condiciones
- Se puede reintentar la zona con las vidas restantes
- Las preguntas se mezclan de nuevo

### Si se pierden todas las vidas
- Game Over global

---

## 9. Sistema de monedas

| Acción | Monedas |
|---|---|
| Respuesta correcta | +10 |
| Racha de 3 seguidas | +25 bonus |
| Respuesta incorrecta | 0 (y -1 vida) |

---

## 10. Tienda de items

| Item | Costo | Efecto |
|---|---|---|
| 🗡️ Espada de Omisión | 30 💰 | Saltás 1 pregunta |
| 🏹 Arco Certero | 50 💰 | Eliminás 1 opción incorrecta |
| 🔮 Visión Arcana | 80 💰 | Revelás la respuesta correcta |
| 🛡️ Escudo de Piedra | 40 💰 | Absorbe automáticamente el próximo fallo |

- Accesible solo desde el mapa, entre zonas
- Cada item es de un solo uso
- Se pueden comprar múltiples unidades

---

## 11. Comportamiento del Escudo

- **No se usa manualmente** — se activa automáticamente al fallar
- Si tenés escudo y fallás → absorbe el golpe, misma pregunta, podés reintentar
- Si no tenés escudo y fallás → perdés una vida, la pregunta avanza
- El botón del escudo en el acceso rápido es solo indicador visual con badge de cantidad

---

## 12. Persistencia del estado

- Zustand + `persist` guarda todo en localStorage bajo la key `the-last-dev-storage`
- Al cerrar y reabrir el navegador, el jugador continúa donde lo dejó
- `resetGame` limpia el localStorage y el estado en memoria
- La pantalla de inicio espera a que Zustand rehidrate antes de renderizar (evita parpadeo)

---

## 13. Preguntas — estructura

```ts
interface Question {
  id: string
  zone: ZoneId
  narrative: string
  options: string[]
  correct: number  // índice de la opción correcta
  difficulty: Difficulty
}
```

25 preguntas totales, 5 por zona, dificultad progresiva:
- Zonas 1-2: easy
- Zona 3: medium
- Zonas 4-5: hard

Helper disponible: `getQuestionsByZone(zone: number): Question[]`

---

## 14. Estado del juego (Zustand)

### Estado
```ts
class: ClassType | null
lives: number           // inicia en 5, global para todo el juego
coins: number
streak: number          // se resetea al entrar a cada zona
currentZone: ZoneId
inventory: Item[]
zonesStatus: ZoneStatus[]
answeredQuestions: string[]
```

### Acciones
```ts
setClass(classType, starterItemId)   // resetea estado + asigna clase e item
addCoins(amount)
loseLife()
incrementStreak()
resetStreak()
useItem(itemId)
buyItem(itemId)
completeZone(zoneId)
markQuestionAnswered(questionId)
resetGame()
setCurrentZone(zoneId)
```

---

## 15. Hook useGame

Centraliza toda la lógica de la pantalla de juego:

- `zoneQuestions` — se fija al montar con `useState` para evitar recálculos
- `correctCount` — contador de aciertos por zona
- `shieldActive` — el escudo se consume automáticamente en `handleAnswer`
- La racha se resetea con `useEffect` al montar (por zona)
- El componente usa `key={zone}` para forzar remount al cambiar de zona

---

## 16. Fases de desarrollo

### ✅ Fase 1 — Funcionalidad base (completada)
- [x] Estructura del proyecto
- [x] Tipos TypeScript
- [x] Store con Zustand + persist
- [x] 3 pantallas funcionales
- [x] 25 preguntas hardcodeadas
- [x] Sistema de vidas, monedas y rachas
- [x] Inventario + tienda + acceso rápido
- [x] Lógica del escudo automático
- [x] Protección de rutas
- [x] Reset del juego
- [x] Persistencia entre sesiones

### 🔲 Fase 2 — Agente + MCP
- [ ] Integración de Groq SDK como narrador Oryn
- [ ] Prompt de personalidad de Oryn
- [ ] Memoria de sesión con historial de respuestas
- [ ] MCP Tool `get_challenge()` para elegir preguntas dinámicamente
- [ ] Oryn reacciona a clases, respuestas, items y zonas

### 🔲 Fase 3 — Polish + Deploy
- [ ] Mapa con fondo ilustrado
- [ ] Animaciones con Framer Motion
- [ ] Deploy en Vercel
- [ ] README para portafolio

---

## 17. Criterios de éxito para portafolio

- [ ] El juego es completable de inicio a fin (5 zonas)
- [ ] El agente Oryn usa memoria real de sesión
- [ ] Oryn llama a `get_challenge()` como tool MCP
- [ ] La tienda, el inventario y los items funcionan end-to-end
- [ ] Deploy público en Vercel con URL compartible
- [ ] README explica el uso de agente + MCP de forma clara

---

*The Last Dev — GDD v3.0* generador de texto

---

## 12. Estructura de un desafío

1. Oryn narra una situación de Syntharia en texto
2. Se presentan 4 opciones de respuesta (sin input libre)
3. El jugador elige una opción (o usa un item antes de responder)
4. Oryn reacciona narrativamente a la elección
5. Se actualizan monedas, vidas y racha
6. Oryn llama a `get_challenge()` y presenta el siguiente desafío

### Ejemplo de desafío

> *"El Puente de Cristal conecta el castillo con las aldeas del norte. Está construido con un hechizo que calcula distancias entre puntos. El antiguo mago usó el tipo de dato correcto... ¿cuál invocas para restaurarlo?"*

- A) String
- B) Integer ✅
- C) Boolean
- D) Array

---

## 13. Flujo completo del juego

```
Pantalla 1 — Selección de clase
    ↓
Jugador elige clase → Oryn da descripción del personaje
    ↓
Pantalla 2 — Mapa de Syntharia
    ↓
Jugador toca zona activa (Bosque de los Primeros Hechizos)
    ↓
Pantalla 3 — Pantalla de juego
    ↓
┌─────────────────────────────────────┐
│           LOOP DE JUEGO             │
│                                     │
│  Oryn llama get_challenge()         │
│            ↓                        │
│  Oryn narra la situación            │
│            ↓                        │
│  Jugador elige opción               │
│  (o usa item del acceso rápido)     │
│            ↓                        │
│  Oryn reacciona + actualiza stats   │
│            ↓                        │
│  ¿Vidas > 0 y preguntas quedan?     │
│  Sí → siguiente desafío             │
│  Vidas = 0 → Game Over              │
│  Zona completa → vuelve al mapa     │
└─────────────────────────────────────┘
    ↓
Mapa actualizado con nueva zona desbloqueada
    ↓
Repite hasta completar las 5 zonas → Victoria
```

---

## 14. Fases de desarrollo — 3 semanas

> Regla de oro: primero que funcione, luego que se vea bien.

### Fase 1 — Funcionalidad base
> Sin estilos. Solo que el juego funcione de punta a punta.

- Estructura del proyecto Next.js + TypeScript
- Navegación entre las 3 pantallas
- Pantalla 1: selección de clase, estado guardado en sesión
- Pantalla 2: mapa con 5 nodos, lógica de bloqueo y desbloqueo
- Pantalla 3: preguntas hardcodeadas, 4 opciones, lógica de respuesta
- Sistema de vidas, monedas y rachas funcionando
- Inventario y acceso rápido con lógica de items
- Tienda funcional

### Fase 2 — Agente + MCP
> Integrar la IA sobre la base funcional.

- Integración de Groq SDK como narrador Oryn
- Prompt de personalidad de Oryn definido y ajustado
- Memoria de sesión con historial de respuestas
- Implementación de la MCP Tool `get_challenge()`
- Oryn reacciona a clases, respuestas, items y zonas

### Fase 3 — Estilo + Polish + Deploy
> Recién acá se trabaja el diseño visual.

- Estética RPG oscura con Tailwind CSS + shadcn/ui
- Mapa con fondo ilustrado del reino
- Barra lateral con identidad visual por clase
- Animaciones con Framer Motion
- Deploy en Vercel
- README documentado para portafolio

---

## 15. Criterios de éxito para portafolio

- [ ] El juego es completable de inicio a fin (5 zonas)
- [ ] El agente Oryn usa memoria real de sesión
- [ ] Oryn llama a `get_challenge()` como tool MCP
- [ ] La tienda, el inventario y los items funcionan end-to-end
- [ ] Deploy público en Vercel con URL compartible
- [ ] README explica el uso de agente + MCP de forma clara

---

*Documento de diseño — The Last Dev. Versión 2.0*
