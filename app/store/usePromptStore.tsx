import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type page = 'create' | 'creative-ai' | 'create-scratch'

type prompt = {
    id: string
    createdAt: string
    title: string
    outline: OutlineCard[] | []
}

interface PromptState {
    page: page;
    setPage: (page: page) => void
    prompts: prompt[]
    setPrompts: (prompts: prompt[]) => void
    addPrompt: (prompt: prompt) => void
    removePrompt: (id: string) => void
}

export const usePromptStore = create<PromptState>()(devtools(persist(
    (set) => ({
        page: 'create',
        setPage: (page: page) => set({ page }),
        prompts: [],
        setPrompts: (prompts: prompt[]) => set({ prompts }),
        addPrompt: (prompt: prompt) => set((state) => ({ prompts: [...state.prompts, prompt] })),
        removePrompt: (id: string) => set((state) => ({ prompts: state.prompts.filter((prompt) => prompt.id !== id) }))
    }),

    { name: 'prompts', }

)
));


