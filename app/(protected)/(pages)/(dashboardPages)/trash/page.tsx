import { getDeletedProjects } from "@/app/actions/project"
import DeleteAllButton from "./_component/DeleteAllButton"
import EmptyBox from "@/app/utils/animations/EmptyBox"
import Projects from "@/components/global/projects"
import { Trash2 } from "lucide-react"

const Page = async () => {
    const trashedProjects = await getDeletedProjects()
    const projects = trashedProjects?.data || []
    const hasProjects = projects.length > 0

    return (
        <div className="flex flex-col gap-8 w-full ">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                        {/* <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                            <Trash2 className="h-5 w-5" />
                        </div> */}
                        <h1 className="text-[21px] font-semibold tracking-tight text-foreground">
                            Trash
                        </h1>
                        {hasProjects && (
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                {projects.length} {projects.length === 1 ? 'item' : 'items'}
                            </span>
                        )}
                    </div>
                    <p className="text-[15px] text-muted-foreground">
                        Manage and recover your deleted presentations or permanently remove them.
                    </p>
                </div>

                {/* Bulk Actions */}
                {hasProjects && (
                    <div className="flex items-center gap-3 shrink-0">
                        <DeleteAllButton Projects={projects} />
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <main className="w-full">
                {hasProjects ? (
                    <Projects projects={projects} />
                ) : (
                    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-gradient-to-b from-muted/20 via-muted/10 to-transparent p-6 text-center transition-all">
                        {/* Subtle Centered Glow */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                            <div className="h-44 w-44 rounded-full bg-primary/5 blur-3xl" />
                        </div>

                        {/* Animation Container */}
                        <div className="relative z-10  max-w-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
                            <EmptyBox />
                        </div>

                        {/* Typography & Callout (Positioned Close to Animation) */}
                        <div className="relative z-10 -mt-2 flex flex-col items-center gap-1 max-w-sm">
                            <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                Trash is Empty
                            </h3>
                            <p className="text-[15px] text-muted-foreground leading-relaxed leading-6">
                                There are no deleted presentations here right now. Slides you move to trash will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Page