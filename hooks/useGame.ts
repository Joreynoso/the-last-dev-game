import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/gameStore"
import { getQuestionsByZone } from "@/data/questions"
import { Question } from "@/types/game"

export function useGame() {
    const router = useRouter()
    const {
        currentZone, lives, coins, streak,
        inventory, addCoins, loseLife,
        incrementStreak, resetStreak,
        useItem, completeZone, markQuestionAnswered,
        answeredQuestions, zonesStatus,
    } = useGameStore()

    const [correctCount, setCorrectCount] = useState(0)

    const [zoneQuestions] = useState<Question[]>(() =>
        getQuestionsByZone(currentZone).filter(
            (q) => !answeredQuestions.includes(q.id)
        )
    )

    const [shieldActive, setShieldActive] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [answered, setAnswered] = useState(false)
    const [visibleOptions, setVisibleOptions] = useState<number[]>([0, 1, 2, 3])
    const [revealed, setRevealed] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [zoneComplete, setZoneComplete] = useState(false)

    const currentQuestion: Question | null = zoneQuestions[currentIndex] ?? null

    useEffect(() => {
        if (lives <= 0) setGameOver(true)
    }, [lives])

    const handleAnswer = (optionIndex: number) => {
        if (answered || !currentQuestion) return

        const isCorrect = optionIndex === currentQuestion.correct

        if (isCorrect) {
            setAnswered(true)
            markQuestionAnswered(currentQuestion.id)
            addCoins(10)
            incrementStreak()
            if ((streak + 1) % 3 === 0) addCoins(25)
            setCorrectCount((prev) => prev + 1)
            setFeedback("¡Correcto! El hechizo resplandece.")
        } else {
            const shield = inventory.find((i) => i.id === "shield")
            if (shield && shield.quantity > 0) {
                useItem("shield")
                setFeedback("🛡️ El Escudo de Piedra absorbió el golpe. ¡Intentalo de nuevo!")
            } else {
                setAnswered(true)
                markQuestionAnswered(currentQuestion.id)
                loseLife()
                resetStreak()
                setFeedback("Incorrecto. Syntharia tiembla...")
            }
        }
    }
    const handleNext = () => {
        if (currentIndex + 1 >= zoneQuestions.length) {
            completeZone(currentZone)
            setZoneComplete(true)
            return
        }
        setCurrentIndex((prev) => prev + 1)
        setFeedback(null)
        setAnswered(false)
        setVisibleOptions([0, 1, 2, 3])
        setRevealed(false)
    }

    const handleUseSword = () => {
        const sword = inventory.find((i) => i.id === "sword")
        if (!sword || sword.quantity <= 0 || answered) return
        useItem("sword")
        handleNext()
    }

    const handleUseBow = () => {
        const bow = inventory.find((i) => i.id === "bow")
        if (!bow || bow.quantity <= 0 || answered || !currentQuestion) return
        const incorrects = visibleOptions.filter((i) => i !== currentQuestion.correct)
        const toRemove = incorrects[Math.floor(Math.random() * incorrects.length)]
        useItem("bow")
        setVisibleOptions((prev) => prev.filter((i) => i !== toRemove))
    }

    const handleUseVision = () => {
        const vision = inventory.find((i) => i.id === "vision")
        if (!vision || vision.quantity <= 0 || answered) return
        useItem("vision")
        setRevealed(true)
    }

    const handleUseShield = () => {
        const shield = inventory.find((i) => i.id === "shield")
        if (!shield || shield.quantity <= 0) return
        useItem("shield")
        setShieldActive(true)
        setFeedback("🛡️ Escudo activado. Tu próximo fallo será absorbido.")
    }

    useEffect(() => {
        resetStreak()
    }, [])

    return {
        currentQuestion,
        feedback,
        answered,
        visibleOptions,
        revealed,
        gameOver,
        zoneComplete,
        lives,
        coins,
        streak,
        inventory,
        currentZone,
        handleAnswer,
        handleNext,
        handleUseSword,
        handleUseBow,
        handleUseVision,
        router,
        correctCount,
        shieldActive,
    }
}