import { Project } from "@/lib/generated/prisma";
import { ContentItem, Slide, Theme } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid'

interface SlideState {
    slides: Slide[],
    project: Project | null,

    setSlides: (slides: Slide[]) => void
    currentSlide: number,
    removeSlide: (id: string) => void
    setProject: (id: Project) => void
    currentTheme: Theme
    setCurrentTheme: (theme: Theme) => void
    getOrderedSlides: () => Slide[]
    reorderSlides: (fromIndex: number, toIndex: number) => void
    addSlideAtIndex: (slide: Slide, index: number) => void
    setCurrentSlide: (index: number) => void
    updateContentItem: (
        slideId: string,
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void

    addComponentInSlide: (
        slideId: string,
        item: ContentItem,
        index: number,
        parentId?: string
    ) => void
}

const defaultTheme: Theme = {
    name: "Electric Indigo",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontColor: "#f4f4f5", // Soft off-white for better readability
    backgroundColor: "#09090b",
    slideBackgroundColor: "#18181b",
    accentColor: "#6366f1", // Indigo 500
    type: 'dark'
}

export const useSlideStore = create(
    persist<SlideState>(
        (set, get) => ({
            slides: [],
            project: null,
            currentSlide: 0,
            currentTheme: defaultTheme,

            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project) => set({ project }),
            setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
            setCurrentSlide: (index: number) => set({ currentSlide: index }),

            getOrderedSlides: () => {
                const state = get()
                return [...(state.slides || [])].sort((a, b) => a.SlideOrder - b.SlideOrder)
            },

            addSlideAtIndex: (slide: Slide, index: number) => {
                set((state) => {
                    const newSlides = [...state.slides]
                    newSlides.splice(index, 0, { ...slide, id: uuidv4() })
                    newSlides.forEach((s, i) => {
                        s.SlideOrder = i
                    })
                    return { slides: newSlides, currentSlide: index }
                })
            },

            addComponentInSlide: (slideId: string, item: ContentItem, index: number, parentId?: string) => {
                set((state) => {
                    const updateContentRecursively = (content: ContentItem): ContentItem => {
                        if (content.id === parentId && Array.isArray(content.content)) {
                            const updatedContent = [...content.content]
                            updatedContent.splice(index, 0, item)

                            return {
                                ...content,
                                content: updatedContent as ContentItem[]
                            }
                        }
                        if (Array.isArray(content.content) && content.content.every((i) => typeof i !== 'string')) {
                            return {
                                ...content,
                                content: content.content.map((subItem) =>
                                    typeof subItem !== 'string'
                                        ? updateContentRecursively(subItem as ContentItem)
                                        : subItem
                                ) as ContentItem[]
                            }
                        }
                        return content
                    }

                    return {
                        slides: state.slides.map((slide) =>
                            slide.id === slideId
                                ? { ...slide, content: updateContentRecursively(slide.content) }
                                : slide
                        )
                    }
                })
            },

            removeSlide: (id: string) => {
                set((state) => ({
                    slides: state.slides.filter((s) => s.id !== id)
                }))
            },

            reorderSlides: (fromIndex: number, toIndex: number) => {
                set((state) => {
                    const newSlides = [...(state.slides || [])]
                    const [removed] = newSlides.splice(fromIndex, 1)
                    if (removed) {
                        newSlides.splice(toIndex, 0, removed)
                    }
                    return {
                        slides: newSlides.map((slide, index) => ({ ...slide, SlideOrder: index }))
                    }
                })
            },

            updateContentItem: (slideId, contentId, newContent) => {
                set((state) => {
                    const updateContentRecursively = (item: ContentItem): ContentItem => {
                        if (item.id === contentId) {
                            return { ...item, content: newContent }
                        }
                        if (
                            Array.isArray(item.content) &&
                            item.content.every((i) => typeof i !== 'string')
                        ) {
                            return {
                                ...item,
                                content: item.content.map((subItem) => {
                                    if (typeof subItem !== 'string') {
                                        return updateContentRecursively(subItem as ContentItem)
                                    }
                                    return subItem
                                }) as ContentItem[]
                            }
                        }
                        return item
                    }

                    return {
                        slides: state.slides.map((slide) =>
                            slide.id === slideId
                                ? { ...slide, content: updateContentRecursively(slide.content) }
                                : slide
                        )
                    }
                })
            },
        }),
        {
            name: "slides-storage",
        }
    )
)