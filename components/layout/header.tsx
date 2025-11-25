"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { WalletConnectButton } from "@/lib/blockchain/wallets/WalletProvider"

const navigation = [
  { name: "Auctions", href: "/auctions" },
  { name: "Create", href: "/create" },
  { name: "My Bids", href: "/my-bids" },
  { name: "My Auctions", href: "/my-auctions" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Lock body scroll when mobile menu is open on mobile devices
  React.useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobile, isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/50 ${
        isScrolled ? "shadow-lg bg-background/95" : "shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:block">
              Fairdrop
            </span>
            <Badge variant="gradient-accent" className="hidden md:block">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex"
              >
                {theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            )}

            {/* Connect Wallet */}
            <div className="hidden sm:flex">
              <WalletConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in-0 duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="fixed inset-x-0 top-16 bottom-0 z-50 md:hidden animate-in slide-in-from-top-10 fade-in-0 duration-300">
              <div className="h-full glass-card rounded-t-2xl p-6 overflow-y-auto">
                {/* Navigation Links */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
                    Navigation
                  </h3>
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-4 rounded-xl text-lg font-medium text-foreground hover:bg-accent/50 active:scale-[0.98] transition-all border border-border/30 hover:border-border/60"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border/30 my-6" />

                {/* Divider */}
                <div className="border-t border-border/30 my-6" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <WalletConnectButton />
                  {mounted && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-3 border-border/30 hover:border-border/60"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="size-5" />
                          <span className="text-base">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="size-5" />
                          <span className="text-base">Dark Mode</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <p className="text-xs text-center text-muted-foreground">
                    Fairdrop Beta • Decentralized Auctions
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
