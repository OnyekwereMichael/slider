import { Suspense } from "react"
import CreatePageSkeleton from "./_components/CreatePage/createPageSkeleton"
import RenderPage from "./_components/CreatePage/RenderPage"
import { onAuthenticateUser } from "@/app/actions/user"
import { redirect } from "next/navigation"
import { toast } from "sonner"
const createPage = async () => {
    const user = await onAuthenticateUser();
    if (!user.user) {
        redirect('/sign-in');
    }

    if (!user.user.subscription) {
        toast.error('Error', {
            description: "Subscribe to a plan"
        })
        redirect('/dashboard')

    }
    return (
        <main className="w-full h-full pt-6">
            <Suspense fallback={<CreatePageSkeleton />}>
                <RenderPage />
            </Suspense>
        </main>
    )
}

export default createPage