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
- Esto convierte a Oryn en un agente real, no solo un generador de texto

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
