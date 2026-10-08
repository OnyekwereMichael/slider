'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

type Props = {
    onAddCard: () => void
}
const AddCardButton = ({ onAddCard }: Props) => {
    const [showGap, setShowGap] = React.useState<boolean>(false)
    return (
        <motion.div
            className='w-full relative'
            initial={{ height: '0.5rem' }}
            animate={{
                height: showGap ? '2.5rem' : '0.5rem',
                transition: { duration: 0.3, ease: 'easeInOut' }
            }}
            onHoverStart={() => setShowGap(true)}
            onHoverEnd={() => setShowGap(false)}
            exit={{
                height: '0.5rem',
                transition: { duration: 0.2, ease: 'easeInOut' }
            }}
        >
            <AnimatePresence>
                {showGap && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
                        className='absolute inset-0 flex items-center justify-center'
                    >
                        <div className='flex items-center w-full'>
                            <div className='flex-1 h-[1px] bg-primary' />
                            <Button
                                variant='outline'
                                size={'sm'}
                                className='rounded-full h-7 w-7 p-0 bg-primary-90 border-primary hover:bg-primary cursor-pointer shrink-0 mx-2'
                                onClick={onAddCard}
                                aria-label='Add new card'
                            >
                                <Plus className='w-4 h-4' />
                            </Button>
                            <div className='flex-1 h-[1px] bg-primary' />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default AddCardButton