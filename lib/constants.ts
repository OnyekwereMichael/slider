import { Archive, BookTemplate, Home, LayoutTemplate, Settings, Trash2 } from "lucide-react";
import { Variants } from "framer-motion";
import { ComponentGroup, LayoutGroup, Theme } from "./types";
import { BlankCardIcon, FourColumnsIcon, FourImageColumnsIcon, ImageAndTextIcon, TextAndImageIcon, ThreeColumnsIcon, ThreeColumnsWithHeadingsIcon, ThreeImageColumnsIcon, TwoColumnsIcon, TwoColumnsWithHeadingsIcon, TwoImageColumnsIcon } from "./IconComponent";
import { AccentLeft, AccentRight, BlankCard, FourColumns, FourImageColumns, ImageAndText, TextAndImage, ThreeColumns, ThreeColumnsWithHeadings, ThreeImageColumns, TwoColumns, TwoColumnsWithHeadings, TwoImageColumns } from "./slideLayouts";
import { BulletListComponent, CalloutBoxComponent, Heading1, Heading2, Heading3, Heading4, NumberedListComponent, Paragraph, ResizableColumn, Table, Title, TodoListComponent } from "./slideComponents";

export const data = {
    user: {
        name: "Shadman",
        email: "[EMAIL_ADDRESS]",
        avatar: "https://ui-avatars.com/api/?name=Shadman&background=random"
    },
    SidebarData: [
        {
            title: 'Home',
            url: '/dashboard',
            icon: Home
        },
        {
            title: 'Template',
            url: '/template',
            icon: LayoutTemplate
        },
        {
            title: 'Trash',
            url: '/trash',
            icon: Archive
        },
        {
            title: 'Setting',
            url: '/settings',
            icon: Settings
        }
    ]
}

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,

        }
    }
}

export const themes: Theme[] = [
    {
        name: "Slate Professional",
        fontFamily: "'Playfair Display', Georgia, Cambria, 'Times New Roman', Times, serif",
        fontColor: "#0f172a",
        backgroundColor: "#f8fafc",
        slideBackgroundColor: "#ffffff",
        accentColor: "#2563eb",
        gradientBackground: "#f8fafc",
        navbarColor: "#ffffff",
        sidebarColor: "#f1f5f9",
        type: "light",
    },
    {
        name: "Obsidian & Gold",
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontColor: "#f8fafc",
        backgroundColor: "#090d16",
        slideBackgroundColor: "#131b2e",
        accentColor: "#f59e0b",
        gradientBackground: "#090d16",
        navbarColor: "#131b2e",
        sidebarColor: "#090d16",
        type: "dark",
    },
    {
        name: "Editorial Serif",
        fontFamily: "'Playfair Display', Georgia, Cambria, 'Times New Roman', Times, serif",
        fontColor: "#1c1917",
        backgroundColor: "#f5f5f4",
        slideBackgroundColor: "#ffffff",
        accentColor: "#991b1b",
        gradientBackground: "#f5f5f4",
        navbarColor: "#ffffff",
        sidebarColor: "#e7e5e4",
        type: "light",
    },
    {
        name: "Midnight OLED",
        fontFamily: "'Sora', 'Outfit', system-ui, -apple-system, sans-serif",
        fontColor: "#f3f4f6",
        backgroundColor: "#000000",
        slideBackgroundColor: "#111827",
        accentColor: "#06b6d4",
        gradientBackground: "#000000",
        navbarColor: "#111827",
        sidebarColor: "#000000",
        type: "dark",
    },
    {
        name: "Corporate Emerald",
        fontFamily: "'General Sans', 'Helvetica Neue', Arial, sans-serif",
        fontColor: "#064e3b",
        backgroundColor: "#f0fdf4",
        slideBackgroundColor: "#ffffff",
        accentColor: "#059669",
        gradientBackground: "#f0fdf4",
        navbarColor: "#ffffff",
        sidebarColor: "#dcfce7",
        type: "light",
    },
    {
        name: "Corporate Navy",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif",
        fontColor: "#0f172a",
        backgroundColor: "#f1f5f9",
        slideBackgroundColor: "#ffffff",
        accentColor: "#0284c7",
        gradientBackground: "#f1f5f9",
        navbarColor: "#ffffff",
        sidebarColor: "#e2e8f0",
        type: "light",
    },
    {
        name: "Minimal Zinc",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        fontColor: "#18181b",
        backgroundColor: "#fafafa",
        slideBackgroundColor: "#ffffff",
        accentColor: "#18181b",
        gradientBackground: "#fafafa",
        navbarColor: "#ffffff",
        sidebarColor: "#f4f4f5",
        type: "light",
    },
    {
        name: "Titanium Dark",
        fontFamily: "'Sora', 'Avenir Next', 'Segoe UI', sans-serif",
        fontColor: "#f4f4f5",
        backgroundColor: "#09090b",
        slideBackgroundColor: "#18181b",
        accentColor: "#6366f1",
        gradientBackground: "#09090b",
        navbarColor: "#18181b",
        sidebarColor: "#09090b",
        type: "dark",
    },
    {
        name: "Warm Parchment",
        fontFamily: "'Lora', Georgia, 'Baskerville', 'Times New Roman', serif",
        fontColor: "#292524",
        backgroundColor: "#f5f5f4",
        slideBackgroundColor: "#fafaf9",
        accentColor: "#d97706",
        gradientBackground: "#f5f5f4",
        navbarColor: "#fafaf9",
        sidebarColor: "#e7e5e4",
        type: "light",
    },

    {
        name: "Slate Professional (Default)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontColor: "#0f172a", // Slate 900
        backgroundColor: "#f8fafc", // Slate 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#2563eb", // Royal Blue 600
        gradientBackground: "#f8fafc",
        navbarColor: "#ffffff",
        sidebarColor: "#f1f5f9",
        type: "light",
    },
    {
        name: "Emerald Executive",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontColor: "#064e3b", // Emerald 900
        backgroundColor: "#f0fdf4", // Emerald 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#059669", // Emerald 600
        gradientBackground: "#f0fdf4",
        navbarColor: "#ffffff",
        sidebarColor: "#dcfce7", // Emerald 100
        type: "light",
    },
    {
        name: "Indigo Modern",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        fontColor: "#1e1b4b", // Indigo 950
        backgroundColor: "#eef2ff", // Indigo 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#4f46e5", // Indigo 600
        gradientBackground: "#eef2ff",
        navbarColor: "#ffffff",
        sidebarColor: "#e0e7ff", // Indigo 100
        type: "light",
    },
    {
        name: "Violet Corporate",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontColor: "#2e1065", // Violet 950
        backgroundColor: "#f5f3ff", // Violet 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#7c3aed", // Violet 600
        gradientBackground: "#f5f3ff",
        navbarColor: "#ffffff",
        sidebarColor: "#ede9fe", // Violet 100
        type: "light",
    },
    {
        name: "Teal Precision",
        fontFamily: "'General Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        fontColor: "#134e4a", // Teal 900
        backgroundColor: "#f0fdfa", // Teal 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#0d9488", // Teal 600
        gradientBackground: "#f0fdfa",
        navbarColor: "#ffffff",
        sidebarColor: "#ccfbf1", // Teal 100
        type: "light",
    },
    {
        name: "Rose Contemporary",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontColor: "#4c0519", // Rose 950
        backgroundColor: "#fff1f2", // Rose 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#e11d48", // Rose 600
        gradientBackground: "#fff1f2",
        navbarColor: "#ffffff",
        sidebarColor: "#ffe4e6", // Rose 100
        type: "light",
    },
    {
        name: "Amber Warmth",
        fontFamily: "'Lora', Georgia, 'Baskerville', serif",
        fontColor: "#451a03", // Amber 950
        backgroundColor: "#fffbeb", // Amber 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#d97706", // Amber 600
        gradientBackground: "#fffbeb",
        navbarColor: "#ffffff",
        sidebarColor: "#fef3c7", // Amber 100
        type: "light",
    },

    {
        name: "Monochrome Zinc",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontColor: "#18181b", // Zinc 900
        backgroundColor: "#fafafa", // Zinc 50
        slideBackgroundColor: "#ffffff",
        accentColor: "#27272a", // Zinc 800
        gradientBackground: "#fafafa",
        navbarColor: "#ffffff",
        sidebarColor: "#f4f4f5", // Zinc 100
        type: "light",
    },

];

export const CreationOptions = [
    {
        title: "Use a",
        highlightedText: "Template",
        description: "Pick from professionally designed layouts to jumpstart your deck",
        type: 'template'
    },
    {
        title: "Generate with",
        highlightedText: "Creative AI",
        description: "Transform a simple topic or prompt into a complete presentation in seconds",
        type: 'creative-ai',
        highlight: true
    },
    {
        title: "Start from",
        highlightedText: "Scratch",
        description: "Begin with a blank canvas and build your slides step-by-step",
        type: 'create-scratch',
    },
]

export const layouts: LayoutGroup[] = [
    {
        name: "Basic",
        layouts: [
            {
                name: "Blank card",
                icon: BlankCardIcon,
                type: "layout",
                layoutType: "blank-card",
                component: BlankCard,
            },
            {
                name: "Image and text",
                icon: ImageAndTextIcon,
                type: "layout",
                layoutType: "imageAndText",
                component: ImageAndText,
            },
            {
                name: "Text and image",
                icon: TextAndImageIcon,
                type: "layout",
                layoutType: "textAndImage",
                component: TextAndImage,
            },
            {
                name: "Two Columns",
                icon: TwoColumnsIcon,
                type: "layout",
                layoutType: "twoColumns",
                component: TwoColumns,
            },
            {
                name: "Two Columns with headings",
                icon: TwoColumnsWithHeadingsIcon,
                type: "layout",
                layoutType: "twoColumnsWithHeadings",
                component: TwoColumnsWithHeadings,
            },
            {
                name: "Three Columns",
                icon: ThreeColumnsIcon,
                type: "layout",
                layoutType: "threeColumns",
                component: ThreeColumns,
            },
            {
                name: "Three Columns with headings",
                icon: ThreeColumnsWithHeadingsIcon,
                type: "layout",
                layoutType: "threeColumnsWithHeadings",
                component: ThreeColumnsWithHeadings,
            },

            {
                name: "Four Columns",
                icon: FourColumnsIcon,
                type: "layout",
                layoutType: "fourColumns",
                component: FourColumns,
            },
        ],
    },

    {
        name: "Card layouts",
        layouts: [
            {
                name: "Accent left",
                icon: ImageAndTextIcon,
                type: "layout",
                layoutType: "accentLeft",
                component: AccentLeft,
            },
            {
                name: "Accent right",
                icon: TextAndImageIcon,
                type: "layout",
                layoutType: "accentRight",
                component: AccentRight,
            },
        ],
    },

    {
        name: "Images",
        layouts: [
            {
                name: "2 images columns",
                icon: TwoImageColumnsIcon,
                type: "layout",
                layoutType: "twoImageColumns",
                component: TwoImageColumns,
            },
            {
                name: "3 images columns",
                icon: ThreeImageColumnsIcon,
                type: "layout",
                layoutType: "threeImageColumns",
                component: ThreeImageColumns,
            },
            {
                name: "4 images columns",
                icon: FourImageColumnsIcon,
                type: "layout",
                layoutType: "fourImageColumns",
                component: FourImageColumns,
            },
        ],
    },
];

export const component: ComponentGroup[] = [
    {
        name: "Text",
        components: [
            {
                name: "Title",
                icon: "T",
                type: "component",
                component: Title,
                componentType: "title",
            },
            {
                componentType: "heading1",
                name: "Heading 1",
                type: "component",
                component: Heading1,
                icon: "H1",
            },
            {
                componentType: "heading2",
                name: "Heading 2",
                type: "component",
                component: Heading2,
                icon: "H2",
            },
            {
                componentType: "heading3",
                name: "Heading 3",
                type: "component",
                component: Heading3,
                icon: "H3",
            },
            {
                componentType: "heading4",
                name: "Heading 4",
                type: "component",
                component: Heading4,
                icon: "H4",
            },

            {
                componentType: "paragraph",
                name: "Paragraph",
                type: "component",
                component: Paragraph,
                icon: "Paragraph",
            },
        ],
    },

    {
        name: "Tables",
        components: [
            {
                componentType: "table2x2",
                name: "2×2 table",
                type: "component",
                component: { ...Table, initialsColumns: 2, initialRows: 2 },
                icon: "⊞",
            },
            {
                componentType: "table3x3",
                name: "3×3 table",
                type: "component",
                component: { ...Table, initialsColumns: 3, initialRows: 3 },
                icon: "⊞",
            },
            {
                componentType: "table4x4",
                name: "4×4 table",
                type: "component",
                component: { ...Table, initialsColumns: 4, initialRows: 4 },
                icon: "⊞",
            },
        ],
    },

    {
        name: "Lists",
        components: [
            {
                componentType: "bulletList",
                name: "Bulleted list",
                type: "component",
                component: BulletListComponent,
                icon: "•",
            },
            {
                componentType: "numberedList",
                name: "Numbered list",
                type: "component",
                component: NumberedListComponent,
                icon: "1.",
            },
            {
                componentType: "todoList",
                name: "Todo list",
                type: "component",
                component: TodoListComponent,
                icon: "☐",
            },
        ],
    },
    {
        name: "Callouts",
        components: [
            {
                componentType: "note",
                name: "Note box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "info" },
                icon: "📝",
            },
            {
                componentType: "info",
                name: "Info box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "info" },
                icon: "ℹ",
            },
            {
                componentType: "warning",
                name: "Warning box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "warning" },
                icon: "⚠",
            },
            {
                componentType: "caution",
                name: "Caution box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "caution" },
                icon: "⚠",
            },
            {
                componentType: "success",
                name: "Success box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "success" },
                icon: "✓",
            },
            {
                componentType: "question",
                name: "Question box",
                type: "component",
                component: { ...CalloutBoxComponent, callOutType: "question" },
                icon: "?",
            },
        ],
    },

    {
        name: "Columns",
        components: [
            {
                componentType: "resizableColumns",
                name: "2x2 Column",
                type: "component",
                component: ResizableColumn,
                icon: "⊞",
            },
        ],
    },
];
