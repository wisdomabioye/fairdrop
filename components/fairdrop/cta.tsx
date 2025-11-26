"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { APP_ROUTES } from "@/constants/app.route"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animated opacity-10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Launch Your <span className="text-gradient-aurora">Fair Auction?</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of projects using Fairdrop for transparent, automated price discovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={APP_ROUTES.create()}>
            <Button variant="gradient-aurora" size="xl" className="group">
              Create Your Auction
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={APP_ROUTES.doc()}>
            <Button variant="outline" size="xl">
              Read Documentation
            </Button>
          </Link>
        </div>
        <div className="mt-12 flex justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            No Setup Fees
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            Audited Contracts
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  )
}
