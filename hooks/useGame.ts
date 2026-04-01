import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameStore } from "@/store/gameStore"
import { getQuestionsByZone } from "@/data/questions"
import { Question } from "@/types/game"
import { item_costs } from "@/data/item_costs"
import { economy } from "@/data/economy"

export function useGame() {
    const router = useRouter()
    const {
        currentZone, lives, coins, streak,
        inventory, addCoins, loseLife,
        incrementStreak, resetStreak,
        useItem, completeZone, markQuestionAnswered,
        answeredQuestions, resetZoneQuestions
    } = useGameStore()

    const [correctCount, setCorrectCount] = useState(0)

    const [zoneQuestions] = useState<Question[]>(() =>
        getQuestionsByZone(currentZone).filter(
            (q) => !answeredQuestions.includes(q.id)
        )
    )

    const [hint, setHint] = useState<string | null>(null)
    const [zoneFailed, setZoneFailed] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [answered, setAnswered] = useState(false)
    const [visibleOptions, setVisibleOptions] = useState<number[]>([0, 1, 2, 3])
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
            addCoins(economy.coinsPerCorrect)
            incrementStreak()
            if ((streak + 1) % 3 === 0) addCoins(economy.coinsPerStreak)
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
            if (correctCount >= 4 && lives > 0) {
                addCoins(economy.coinsPerZone)
                completeZone(currentZone)
                setZoneComplete(true)
            } else {
                resetZoneQuestions(currentZone)
                setZoneFailed(true)
            }
            return
        }
        setCurrentIndex((prev) => prev + 1)
        setFeedback(null)
        setAnswered(false)
        setVisibleOptions([0, 1, 2, 3])
        setHint(null)
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

    const handleUseScroll = () => {
        const scroll = inventory.find((i) => i.id === "scroll")
        if (!scroll || scroll.quantity <= 0 || answered || !currentQuestion) return
        useItem("scroll")
        setHint(currentQuestion.hint ?? "Oryn no encuentra pistas sobre este desafío.")
    }

    useEffect(() => {
        resetStreak()
    }, [])

    return {
        currentQuestion,
        feedback,
        answered,
        visibleOptions,
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
        handleUseScroll,
        router,
        correctCount,
        zoneFailed,
        hint,
    }
}