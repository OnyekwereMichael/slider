import { OutlineCard } from "@/lib/types"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type CreativeAIStore = {
    outlines: OutlineCard[] | []
    addMultipleOutlines: (outlines: OutlineCard[]) => void
    addOutline: (outline: OutlineCard) => void
    resetOutlines: () => void
    currentAIPrompt: string
    setCurrentAIPrompt: (prompt: string) => void

}

export const useCreativeAIStore = create<CreativeAIStore>()(
    devtools(
        persist(
            (set) => ({
                currentAIPrompt: '',
                setCurrentAIPrompt: (prompt: string) => set({ currentAIPrompt: prompt }),
                outlines: [],
                addOutline: (outline: OutlineCard) =>
                    set((state) => {
                        if (state.outlines.some((c) => c.id === outline.id)) {
                            return state;
                        }
                        return { outlines: [...state.outlines, outline] };
                    }),
                addMultipleOutlines: (outlines: OutlineCard[]) => {
                    const unique = (outlines || [])?.filter((card, index, self) =>
                        self.findIndex((c) => c.id === card.id) === index
                    );
                    set({ outlines: unique || [] });
                },
                resetOutlines: () => set({ outlines: [] }),
            }),
            { name: "creative-ai" } // persists to localStorage under this key
        )
    )
)