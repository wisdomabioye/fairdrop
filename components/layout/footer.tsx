"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MessageCircle,
  Mail,
  ArrowUpRight,
  Heart,
} from "lucide-react"
import { useSelectedChain } from "@/components/layout/ChainSelector"
import { APP_ROUTES } from "@/constants/app.route"

const getFooterLinks = (chain: number) => ({
  product: [
    { name: "Auctions", href: APP_ROUTES.auctions(chain) },
    { name: "Create Auction", href: APP_ROUTES.create() },
    { name: "How it Works", href: "/#how-it-works" },
  ],
  resources: [
    { name: "Documentation", href: APP_ROUTES.doc() },
    { name: "API Reference", href: APP_ROUTES.api() },
    { name: "Whitepaper", href: APP_ROUTES.whitepaper() },
  ],
  company: [
    { name: "About", href: APP_ROUTES.about() },
    { name: "Contact", href: APP_ROUTES.contact() },
  ],
  legal: [
    { name: "Privacy Policy", href: APP_ROUTES.privacy() },
    { name: "Terms of Service", href: APP_ROUTES.terms() },
    { name: "Cookie Policy", href: APP_ROUTES.cookies() },
  ],
})

// Simple icon components for social media
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const socialLinks = [
  { name: "Twitter", icon: TwitterIcon, href: "https://x.com/#" },
  { name: "GitHub", icon: GitHubIcon, href: "https://github.com/#" },
  { name: "Discord", icon: MessageCircle, href: "https://discord.gg/#" },
  { name: "Email", icon: Mail, href: "mailto:xpldevelopers@gmail.com" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const selectedChain = useSelectedChain()
  const footerLinks = getFooterLinks(selectedChain)

  return (
    <footer className="relative border-t border-border/50 bg-gradient-surface">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">
                Fairdrop
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Revolutionizing price discovery through decentralized Dutch auctions.
              Fair, transparent, and automated.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="gradient-soft" className="text-xs">
                Audited
              </Badge>
              <Badge variant="glass" className="text-xs">
                Decentralized
              </Badge>
              <Badge variant="outline" className="text-xs">
                Open Source
              </Badge>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Newsletter Section */}
        <div className="py-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Get the latest news about auctions, features, and updates.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button variant="gradient" size="default">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>� {currentYear} Fairdrop. Built with</span>
            <Heart className="size-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for fair markets.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-accent/50"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="size-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  )
}
