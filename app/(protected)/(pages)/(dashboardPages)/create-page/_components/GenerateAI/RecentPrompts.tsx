import { useCreativeAIStore } from "@/app/store/useCreativeAIStore"
import { usePromptStore } from "@/app/store/usePromptStore"
import EmptyBox from "@/app/utils/animations/EmptyBox"
import NothingHere from "@/app/utils/animations/NothingHere"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { containerVariants, itemVariants } from "@/lib/constants"
import { timeFormat } from "@/lib/utils"
import { motion } from "framer-motion"
import { toast } from "sonner"

type Props = {}

const RecentPrompts = (props: Props) => {
    const { prompts, setPage } = usePromptStore()
    const { addMultipleOutlines, setCurrentAIPrompt } = useCreativeAIStore()

    const handleEdit = (id: string) => {
        const prompt = prompts.find((p) => p.id === id)
        if (prompt) {
            setPage('creative-ai')
            const outlinesList = prompt?.outline || (prompt as unknown as { outlines?: any[] })?.outlines || []
            addMultipleOutlines(outlinesList)
            setCurrentAIPrompt(prompt?.title)
        } else {
            return toast.error('Error', {
                description: "Prompt not found"
            })
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            className="space-y-4"
        >
            <motion.h2
                variants={containerVariants}
                className="text-2xl font-semibold text-center"
            >
                Your Recent Prompts
            </motion.h2>

            {prompts.length === 0 && (
                <motion.div
                    variants={containerVariants}
                    className=" w-full lg:max-w-[80%] mx-auto flex flex-col  items-center"
                >
                    <EmptyBox />
                    <p className="text-muted-foreground">No recent prompts</p>
                </motion.div>
            )}

            <motion.div
                variants={containerVariants}
                className="space-y-2 -full lg:max-w-[80%] mx-auto"
            >
                {prompts.map((prompt) => (
                    <motion.div
                        key={prompt.id}
                        variants={itemVariants}
                        className="space-y-2 w-full lg:max-w-[50%] mx-auto"
                    >
                        <Card className='p-4 flex hover:bg-accent/50 transition-colors duration-300'>
                            <div className="max-w-[70%]">
                                <h3 className="font-semibold text-xl line-clamp-1">{prompt.title}</h3>
                                <p className="font-semibold text-sm text-muted-foreground">{timeFormat(prompt.createdAt)}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-vivid">Creative  AI</span>
                                <Button
                                    onClick={() => handleEdit(prompt?.id)}
                                    variant="default"
                                    size="sm"
                                    className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                                >
                                    Edit
                                </Button>
                            </div>

                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default RecentPrompts