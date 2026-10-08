import { OutlineCard } from "@/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type OutlineStore = {
    outlines: OutlineCard[]
    resetOutlines: () => void
    addOutline: (outline: OutlineCard) => void
    addMultipleOutlines: (outlines: OutlineCard[]) => void
}

const useScratchStore = create<OutlineStore>()(
    persist(
        (set) => ({
            outlines: [],
            resetOutlines: () => set({ outlines: [] }),
            addOutline: (outline: OutlineCard) => set((state) => {
                if (state.outlines.some((c) => c.id === outline.id)) {
                    return state;
                }
                return { outlines: [...state.outlines, outline] };
            }),
            addMultipleOutlines: (outlines: OutlineCard[]) => {
                const unique = outlines.filter((card, index, self) =>
                    self.findIndex((c) => c.id === card.id) === index
                );
                set({ outlines: unique });
            },
        }),
        {
            name: "scratch",
        }
    )
)

export default useScratchStore