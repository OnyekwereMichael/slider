import { onAuthenticateUser } from '@/app/actions/user'
import { redirect } from 'next/navigation'
import ProfileCard from './_component/ProfileCard'
import PlanCard from './_component/PlanCard'
import SellerCard from './_component/SellerCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Settings — Slider',
    description: 'Manage your profile, subscription and storefront settings.',
}

const SettingsPage = async () => {
    const checkUser = await onAuthenticateUser()
    if (!checkUser.user) redirect('/sign-in')

    const user = checkUser.user

    return (
        <div className="flex flex-col gap-6 pb-12 max-w-3xl">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="font-serif text-[24px] font-medium dark:text-primary">Settings</h1>
                <p className="text-base text-muted-foreground">Manage your account, plan and storefront.</p>
            </div>

            {/* Profile */}
            <section>
                <SectionLabel>Profile</SectionLabel>
                <ProfileCard user={user} />
            </section>

            {/* Plan */}
            <section>
                <SectionLabel>Subscription</SectionLabel>
                <PlanCard user={user} />
            </section>

            {/* Seller */}
            <section>
                <SectionLabel>Creator Storefront</SectionLabel>
                <SellerCard user={user} />
            </section>
        </div>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-2 text-[15px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {children}
        </p>
    )
}

export default SettingsPage