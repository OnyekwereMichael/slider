'use client'

import { usePromptStore } from "@/app/store/usePromptStore"
import { AnimatePresence, motion } from "framer-motion"
import CreatePage from "./CreatePage"
import { useRouter } from "next/navigation"
import CreativeAI from "../GenerateAI/CreativeAI"
import ScratchPage from "../Scratch/ScratchPage"


const RenderPage = () => {
    const router = useRouter()
    const { page, setPage } = usePromptStore()

    const handleBack = () => {
        setPage('create')
    }

    const handleSelectOption = (option: string) => {
        if (option === 'template') {
            router.push('/templates')
        } else if (option === 'creative-ai') {
            setPage('creative-ai')
        } else if (option === 'create-scratch') {
            setPage('create-scratch')
        }
    }

    const renderStep = () => {
        switch (page) {
            case 'create':
                return <CreatePage onSelectOption={handleSelectOption} />
            case 'creative-ai':
                return <CreativeAI onBack={handleBack} />
            case 'create-scratch':
                return <ScratchPage onBack={handleBack} />
            default:
                return null
        }
    }
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                key={page}

            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    )
}

export default RenderPage