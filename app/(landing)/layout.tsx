import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Add padding-top to account for fixed header (h-16 = 4rem) */}
      <main className="flex-1 pt-16">
        <div className="mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
