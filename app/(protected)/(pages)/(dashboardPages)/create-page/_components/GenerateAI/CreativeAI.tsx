'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCreativeAIStore } from "@/app/store/useCreativeAIStore"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CardList from "../Common/CardList"
import { usePromptStore } from "@/app/store/usePromptStore"
import RecentPrompts from "./RecentPrompts"
import { toast } from "sonner"
import { generateCreativePrompt } from "@/app/actions/openai"
import { OutlineCard } from "@/lib/types"
import { v4 as uuid } from 'uuid'
import { createProject } from "@/app/actions/project"
import { useSlideStore } from "@/app/store/useSlideStore"

type props = {
    onBack: () => void
}
const CreativeAI = ({ onBack }: props) => {
    const router = useRouter()
    const { setProject } = useSlideStore()
    const { currentAIPrompt, setCurrentAIPrompt, outlines, resetOutlines, addOutline, addMultipleOutlines } = useCreativeAIStore()
    const [noOfCards, setNoOfCards] = useState<number>(0)
    const { prompts, addPrompt } = usePromptStore()
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [selectCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')

    const handleBack = () => {
        onBack()
    }

    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')

        setCurrentAIPrompt('')
        resetOutlines()
    }

    const generateOutline = async () => {
        if (currentAIPrompt === '') {
            toast.error('Error', {
                description: 'Please enter a prompt to generate an outline',
            })
            return
        }

        setIsGenerating(true)

        const res = await generateCreativePrompt(currentAIPrompt)
        if (res?.status === 200 && res?.data?.outlines) {
            const cardsData: OutlineCard[] = []
            res.data?.outlines.map((outline: string, idx: number) => {
                const newCard = {
                    id: uuid(),
                    title: outline,
                    order: idx + 1
                }
                cardsData.push(newCard)
            })
            addMultipleOutlines(cardsData)
            setNoOfCards(cardsData.length)
            toast.success("Success", { description: "Outline generated successfully" })
        } else {
            toast.success("Success", { description: "Failed to generate outline" })
        }

        setIsGenerating(false)
    }

    const handleGenerate = async () => {
        setIsGenerating(true)
        if (outlines.length === 0) {
            toast.error('Error', {
                description: 'Please generate an outline first',
            })
            return
        }

        const res = await createProject(
            currentAIPrompt,
            outlines.slice(0, noOfCards),
        )

        if (res?.status === 200 && res?.data?.id) {
            router.push(`/presentation/${res.data.id}/select-theme`)
            setProject(res.data)
            addPrompt({
                id: uuid(),
                title: currentAIPrompt || outlines[0]?.title,
                outline: outlines,
                createdAt: new Date().toISOString(),
            })

            toast.success("Success", { description: "Project created successfully" })

            setCurrentAIPrompt('')
            resetOutlines()
        }
        else {
            toast.success("Success", { description: "Failed to create project" })
        }
        setIsGenerating(false)
    }


    useEffect(() => {
        // Automatically clean up any existing duplicate outlines on mount
        const uniqueOutlines = outlines.filter((card, index, self) =>
            self.findIndex((c) => c.id === card.id) === index
        )
        if (uniqueOutlines.length !== outlines.length) {
            addMultipleOutlines(uniqueOutlines)
        }
    }, [])

    useEffect(() => {
        setNoOfCards(outlines?.length)
    }, [outlines?.length])


    return (
        <motion.div
            className="space-y-6 w-full mx-auto px-4 sm:px-6 lg:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center justify-between">
                <Button
                    onClick={handleBack}
                    variant='outline'
                    className='mb-4 bg-white cursor-pointer text-black'
                >
                    <ChevronLeft className='mr-2 h-4 w-4' />
                    Back
                </Button>
            </div>
            <motion.div
                variants={itemVariants}
                className="bg-primary/10 py-4 rounded-xl space-y-4 "
            >
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-primary max-sm:text-2xl">
                        Generate with <span className="text-vivid">Creative AI</span>
                    </h1>
                    <p className="text-secondary mt-1">
                        Tell us your idea and watch it come to life
                    </p>
                </div>
                <div className="w-[55%] max-sm:w-full">
                    <div className="flex items-center gap-2 rounded-xl border border-vivid bg-transparent px-3 py-1.5 focus-within:ring-2 focus-within:ring-vivid/50 transition-all">
                        {/* Text Input */}
                        <Input
                            onChange={(e) => setCurrentAIPrompt(e.target.value)}
                            value={currentAIPrompt}
                            placeholder="Enter prompt to create your new slide..."
                            className="text-base sm:text-lg border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-vivid/60 flex-grow px-2 py-2"
                        />

                        {/* Embedded Select Dropdown */}
                        <Select
                            value={noOfCards?.toString()}
                            onValueChange={(value) => setNoOfCards(parseInt(value))}
                        >
                            <SelectTrigger className="w-auto h-9 gap-1 font-medium text-sm sm:text-sm border-0 bg-vivid/10 shadow-none focus:ring-0 focus:ring-offset-0 rounded-lg px-3 shrink-0">
                                <SelectValue placeholder="Cards" />
                            </SelectTrigger>


                            <SelectContent className="w-fit flex justify-end my-10">
                                {outlines?.length === 0 ? (
                                    <SelectItem value="0" className="font-semibold max-sm:text-[12px]! border-none!">
                                        No cards
                                    </SelectItem>
                                ) : (
                                    Array.from({ length: outlines?.length }, (_, i) => i + 1).map(
                                        (number) => (
                                            <SelectItem
                                                key={number}
                                                value={number.toString()}
                                                className="font-semiboldmax-sm:text- cursor-pointer"
                                            >
                                                {number} {number === 1 ? "card" : "cards"}
                                            </SelectItem>
                                        )
                                    )
                                )}
                            </SelectContent>
                        </Select>

                        <Button
                            className="bg-red-400! text-white! cursor-pointer"
                            onClick={resetCards}
                            size='icon'
                            aria-label="Reset Cards"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="w-full flex justify-center items-center cursor-pointer! ">
                <Button
                    onClick={generateOutline}
                    className="font-medium! text-[15px] flex gap-2 items-center bg-white! text-black!  cursor-pointer!"
                    disabled={isGenerating}
                >
                    {isGenerating ? <Loader2 className="mr-2 animate-spin" /> : 'Generate Outline'}
                </Button>

            </div>

            <CardList
                outlines={outlines}
                editingCard={editingCard}
                selectCard={selectCard}
                editText={editText}
                addOutline={addOutline}
                addMultipleOutlines={addMultipleOutlines}

                onEditChange={setEditText}
                onCardSelect={setSelectedCard}
                setEditText={setEditText}
                setSelectedCard={setSelectedCard}
                setEditingCard={setEditingCard}

                onCardDoubleClick={(id, title) => {
                    setEditingCard(id)
                    setEditText(title)
                }}

            />

            {outlines?.length > 0 && (
                <div className="w-full flex justify-center items-center cursor-pointer! text-white! ">
                    <Button
                        onClick={handleGenerate}
                        className="w-full cursor-pointer! bg-white! text-black! py-4.5!"
                        disabled={isGenerating || outlines.length === 0}
                    >
                        {isGenerating ? <Loader2 className="mr-2 animate-spin" /> : 'Generate Slide'}
                    </Button>
                </div>
            )}

            {prompts.length > 0 && <RecentPrompts />}

        </motion.div>
    )
}

export default CreativeAI