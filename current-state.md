# 📜 Current State - The Last Dev

Este documento centraliza el estado actual del proyecto, las funcionalidades implementadas, los datos relevantes y el progreso del desarrollo. Se actualizará con cada cambio significativo.

---

## 🚀 Resumen del Proyecto
**The Last Dev** es un RPG educativo narrativo donde el jugador debe restaurar el reino de **Syntharia** resolviendo desafíos de programación y lógica. El juego es guiado por **Oryn**, un agente IA (sentinel).

### 🛠️ Stack Tecnológico
| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 15 (App Router)** | Framework principal |
| **TypeScript** | Tipado y robustez |
| **Zustand + Persist** | Gestión de estado global con persistencia en LocalStorage |
| **Tailwind CSS + shadcn/ui** | Interfaz de usuario premium y responsiva |
| **Framer Motion** | Animaciones y transiciones (Fase 3) |
| **Groq + Vercel AI SDK** | Inteligencia del agente Oryn (Fase 2) |

---

## 🎮 Funcionalidades Actuales (Fase 1 Refinada)

### 1. Sistema de Clases
- **Guerrero (Galahed)**: Inicia con un *Escudo de Piedra*.
- **Mago (Kael)**: Inicia con una *Espada de Omisión*.
- **Arquero (Artemis)**: Inicia con un *Pergamino del Oráculo*.
- La selección de clase reinicia la aventura y asigna el ítem correspondiente.
- **Protección de Rutas**: Si no hay una clase seleccionada, el juego redirige automáticamente al inicio.

### 2. Progresión por Zonas (5 Escenarios)
1. **Bosque de los Primeros Hechizos** (Desbloqueado al inicio)
2. **Montañas del Código Perdido**
3. **Aldea del Compilador Roto**
4. **Volcán de los Bugs Eternos**
5. **Castillo del Kernel Oscuro**
- **Condición de Victoria**: Se requieren al menos 4 de 5 aciertos para superar una zona.
- **Condición de Fracaso**: Si no se alcanzan los aciertos mínimos, la zona se reinicia y las preguntas respondidas vuelven a estar disponibles.

### 3. Mecánicas de Juego
- **Vidas**: El jugador inicia con 5 vidas. Perder todas implica *Game Over*.
- **Monedas**: Gestionadas por un sistema de economía centralizado.
- **Inventario & Tienda**: Compra de ítems (Escudos, Saltos de pregunta, Pergaminos de pistas).
- **Escudo Automático**: Se consume automáticamente al fallar para evitar la pérdida de vida.
- **Pistas (Hints)**: El *Pergamino del Oráculo* permite visualizar una pista narrativa para ayudar con el desafío.

---

## 📊 Datos y Estado

### Modelos de Datos (`types/game.ts`)
- `ClassType`: "warrior" | "mage" | "archer"
- `ItemId`: "sword" | "bow" | "scroll" (nuevo) | "shield"
- `Question`: Ahora incluye una propiedad opcional `hint` para pistas narrativas.

### Configuración del Juego (`data/`)
- **`economy.ts`**: Define ganancias por acierto (+5), racha (+10) y zona superada (+20).
- **`item_costs.ts`**: Costos centralizados para ítems (Escudo: 40, Espada: 80, Arco: 50, Pergamino: 25).
- **`questions.ts`**: 25 preguntas actualizadas con pistas personalizadas para cada una.

### Estado Global (`store/gameStore.ts`)
- **Hydration**: Implementada verificación de hidratación para evitar errores de SSR.
- **Nuevas Acciones**: `resetZoneQuestions` para permitir el reintento de zonas fallidas.

---

## 🛠️ Últimos Cambios (Log)
- **2026-03-31**: 
    - **Refactor de Economía**: Centralización de costos y ganancias en `economy.ts` y `item_costs.ts`.
    - **Sistema de Pistas**: Reemplazo de "Visión Arcana" por "Pergamino del Oráculo" y adición de `hint` a todas las preguntas.
    - **Lógica de Reintento**: Implementación de la pantalla de error de zona y reseteo de preguntas por zona al fallar.
    - **Estabilidad**: Adición de `hydrated` state y protección de rutas en `page.tsx`.
    - **Corrección de Hooks**: Solución al crash de `Rendered fewer hooks than expected`.
    - **Documentación**: Creación y actualización de `current-state.md`.

---

## 🗺️ Roadmap / Próximos Pasos

### 🔲 Fase 2: El Despertar de Oryn (IA)
- Integración de **Groq SDK** para la narrativa dinámica.
- Implementación de la Tool MCP `get_challenge()` para desafíos dinámicos.
- Memoria de sesión para que Oryn recuerde el desempeño del jugador.

### 🔲 Fase 3: Estética y Pulido
- Ilustraciones de fondo para el mapa y zonas.
- Efectos de sonido y música ambiental.
- Animaciones fluidas con Framer Motion.
- Preparación para Deploy en Vercel.
