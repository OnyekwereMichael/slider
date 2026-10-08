import { getAllProjects } from "@/app/actions/project"
import NoContent from "@/components/global/not-found"
import ProjectCard from "@/components/global/project-card"
import Projects from "@/components/global/projects"

const DashboardPage = async () => {
    const allProjects = await getAllProjects()
    return (
        <div className="w-full flex flex-col gap-6 relative p-4">
            <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col item-start">
                    <h1 className="font-serif text-[23px] font-medium dark:text-primary backdrop-blur-lg max-sm:text-xl max-sm:font-medium">Projects</h1>
                    <p className="text-[16px] font-normal dark:text-secondary max-sm:text-sm"> All of your work in one place</p>
                </div>
            </div>


            {'data' in allProjects && allProjects.data && allProjects.data.length > 0 ? (
                <Projects projects={allProjects.data} />

            ) : (
                <NoContent />
            )}

        </div>
    )
}

export default DashboardPage