'use client'
import useScratchStore from '@/app/store/useScratchStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { containerVariants } from '@/lib/constants'
import { motion } from 'framer-motion'
import { ChevronLeft, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import CardList from '../Common/CardList'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { createProject } from '@/app/actions/project'
import { useSlideStore } from '@/app/store/useSlideStore'
import { useRouter } from 'next/navigation'

type Props = {
    onBack: () => void
}
const ScratchPage = ({ onBack }: Props) => {
    const router = useRouter()
    const [editText, setEditText] = useState<string>('')
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [selectCard, setSelectedCard] = useState<string | null>(null)
    const { resetOutlines, outlines, addOutline, addMultipleOutlines } = useScratchStore()

    useEffect(() => {
        // Automatically clean up any existing duplicate outlines on mount
        const uniqueOutlines = outlines.filter((card, index, self) =>
            self.findIndex((c) => c.id === card.id) === index
        )
        if (uniqueOutlines.length !== outlines.length) {
            addMultipleOutlines(uniqueOutlines)
        }
    }, [])

    const { setProject } = useSlideStore()
    const handleBack = () => {
        resetOutlines()
        onBack()
    }

    const resetCards = () => {
        setEditText('')
        resetOutlines()
    }

    const handleCard = () => {
        if (!editText) return
        const newCard = {
            id: uuidv4(),
            title: editText || 'Untitled',
            order: outlines.length + 1
        }
        setEditText('')
        addOutline(newCard)
    }

    const handleGenerate = async () => {
        if (outlines.length === 0) {
            toast.error('Please add at least one card to generate slides')
            return
        }

        const res = await createProject(outlines?.[0]?.title, outlines)
        if (res?.status === 200) {
            toast.success('Project created successfully')
        }
        if (res?.status !== 200) {
            toast.error('Project creation failed')
        }

        if (res?.data) {
            setProject(res.data)
            resetOutlines()
            toast.success('Project created successfully')

            router.push(`/presentation/${res.data?.id}/select-home`)
        } else {
            toast.error('Project created successfully')
        }



    }
    return (
        <motion.div
            className='space-y-6 w-full  mx-auto px-4 sm:px-0'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
        >
            <Button
                onClick={handleBack}
                variant='outline'
                className='mb-4 bg-white cursor-pointer text-black'
            >
                <ChevronLeft className='mr-2 h-4 w-4' />
                Back
            </Button>

            <div className='mt-5'>
                <h1 className="font-serif text-3xl font-semibold text-primary max-sm:text-2xl">
                    Generate from <span className="text-vivid">Scratch</span>
                </h1>
                <p className="text-secondary mt-1">
                    Tell us your idea and watch it come to life
                </p>
            </div>

            <motion.div
                className='bg-primary/10 w-[50%] border max-sm:w-full p-2 rounded-xl '
            >
                <div className='flex flex-row sm:flex-row justify-between gap-3 items-center rounded-xl'>
                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder='Enter your Prompt...'
                        className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 transparent flex-row'
                    />
                    <div className='flex items-center gap-3'>
                        <Select
                            value={outlines.length > 0 ? outlines.length.toString() : '0'}
                        >
                            <SelectTrigger className='w-fit gap-2  font-semibold shadow-xl'
                            >
                                <SelectValue placeholder='Select number of cards' />
                            </SelectTrigger>
                            <SelectContent className='mt-10'>
                                <SelectItem value='0'>0</SelectItem>
                                {outlines.length > 0 && Array.from({ length: outlines.length }, (_, i) => i + 1).map((number) => (
                                    <SelectItem key={number} value={number.toString()}>
                                        {number} {number === 1 ? "card" : "cards"}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>

                        <Button
                            className='bg-red-400! text-white!'
                            onClick={resetCards}
                            size='icon'
                            aria-label='Reset Cards'
                        >
                            <RotateCcw className='w-4 h-4' />
                        </Button>
                    </div>



                </div>

            </motion.div>

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

            <div className='flex gap-3'>

                <Button
                    onClick={handleCard}
                    variant={'secondary'}
                    className='w-[50%] bg-white! text-black! cursor-pointer! max-sm:w-full py-4.5! '

                >
                    Add Card
                </Button>

                {outlines.length > 0 && (
                    <Button
                        onClick={handleGenerate}
                        variant={'secondary'}
                        className='w-[49%] bg-white! text-black! cursor-pointer!    max-sm:w-full py-4.5! '

                    >
                        Generate Slides
                    </Button>

                )}
            </div>
        </motion.div>
    )
}

export default ScratchPage