import type { Metadata } from 'next'
import Navbar from './_components/landing/Navbar'
import HeroSection from './_components/landing/HeroSection'
import HowItWorksSection from './_components/landing/HowItWorksSection'
import FeaturesSection from './_components/landing/FeaturesSection'
import MarketplaceSection from './_components/landing/MarketplaceSection'
import BeforeAfterSection from './_components/landing/BeforeAfterSection'
import PricingSection from './_components/landing/PricingSection'
import TestimonialsSection from './_components/landing/TestimonialsSection'
import FAQSection from './_components/landing/FAQSection'
import FinalCTASection from './_components/landing/FinalCTASection'
import Footer from './_components/landing/Footer'

export const metadata: Metadata = {
  title: 'Slider — AI Presentation Studio & Template Marketplace',
  description:
    'Generate polished presentation decks in minutes with AI, customize every detail, then sell your templates and earn. The professional creative tool for slides.',
  openGraph: {
    title: 'Slider — AI Presentation Studio',
    description: 'Build. Customize. Sell. The AI studio for presentations that pays you back.',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(222_13%_11%)] text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MarketplaceSection />
        <BeforeAfterSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
