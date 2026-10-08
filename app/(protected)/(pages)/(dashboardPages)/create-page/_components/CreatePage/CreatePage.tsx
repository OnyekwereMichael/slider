'use client'

import { Button } from "@/components/ui/button"
import { containerVariants, CreationOptions, itemVariants } from "@/lib/constants"
import { motion } from "framer-motion"
import RecentPrompts from "../GenerateAI/RecentPrompts"
import { usePromptStore } from "@/app/store/usePromptStore"
import { useEffect } from "react"

type Props = {
    onSelectOption: (option: string) => void
}
const CreatePage = ({ onSelectOption }: Props) => {
    const { prompts, setPage } = usePromptStore()
    // useEffect(() => {
    //     setPage('create')
    // }, [])
    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='space-y-8'
        >
            <motion.div
                variants={itemVariants}
                className=" space-y-2"
            >
                <h1 className="font-serif text-3xl font-semibold text-primary max-sm:text-3xl">How would you like to get started?</h1>
                <p className="text-secondary">Choose yor preferred method to begin</p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-3">
                {CreationOptions.map((option) => (
                    <motion.div
                        key={option.type}

                        whileTap={{
                            scale: 1.05, rotate: 1, transition: { duration: 0.1 }
                        }}
                        whileHover={{
                            scale: 1.05, rotate: 1, transition: { duration: 0.1 }
                        }}
                        variants={itemVariants}
                        className={`${option.highlight ? 'border' : 'hover:bg-vivid-gradient border'} rounded-xl p-[1px] transition-all duration-300 ease-in-out cursor-pointer`}
                        onClick={() => onSelectOption(option.type)}
                    >
                        <motion.div
                            className="w-full p-4 flex flex-col gap-y-6 items-start  rounded-xl"
                            whileHover={{
                                transition: { duration: 0.1 }
                            }}
                        >
                            <div className="flex flex-col items-start w-full gap-y-2">
                                <div >
                                    <p className="text-muted-foreground text-lg font-semibold">{option.title}</p>
                                    <p className={`${option.highlight ? 'text-vivid' : 'text-primary'} text-[21px] font-semibold mt-1.5`}>

                                        {option.highlightedText}
                                    </p>
                                </div>
                                <p className="text-secondary text-sm font-normal leading-6">{option.description}</p>
                            </div>
                            <motion.div>

                                <Button
                                    variant={option.highlight ? 'default' : 'outline'}
                                    className="w-fit px-3 rounded-xl font-bold bg-white! dark:bg-black text-black! dark:text-white cursor-pointer"
                                    size={'sm'}
                                    onClick={() => onSelectOption(option.type)}
                                >
                                    {option.highlight ? 'Generate' : 'Continue'}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
            {prompts.length > 0 && <RecentPrompts />}
        </motion.div>
    )
}

export default CreatePage