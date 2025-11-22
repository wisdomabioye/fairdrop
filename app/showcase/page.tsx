"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ThemeShowcase() {
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fairdrop</h1>
            <p className="text-sm text-muted-foreground">Theme Showcase</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button>Connect Wallet</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <Badge variant="secondary" className="mb-2">Beta Launch 2026</Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Fair Price Discovery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary Dutch-style auction protocol ensuring transparent, equal pricing for all participants
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Button size="lg">Start Auction</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </section>

        <Separator />

        {/* Live Auction Card Examples */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Live Auctions</h3>
            <p className="text-muted-foreground">Current descending-price auctions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auction Card 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Token Sale Alpha</CardTitle>
                    <CardDescription>1,000,000 tokens available</CardDescription>
                  </div>
                  <Badge>Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="font-bold text-primary text-xl">$0.14</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Floor Price</span>
                    <span className="font-medium">$0.10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">342</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }} />
                </div>
                <p className="text-xs text-muted-foreground">67% sold • Price drops in 45 blocks</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Place Bid</Button>
              </CardFooter>
            </Card>

            {/* Auction Card 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>NFT Collection Drop</CardTitle>
                    <CardDescription>500 unique collectibles</CardDescription>
                  </div>
                  <Badge variant="secondary">Ending Soon</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="font-bold text-primary text-xl">0.08 ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Floor Price</span>
                    <span className="font-medium">0.05 ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">128</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '42%' }} />
                </div>
                <p className="text-xs text-muted-foreground">42% sold • Price drops in 12 blocks</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="secondary">Place Bid</Button>
              </CardFooter>
            </Card>

            {/* Auction Card 3 - Completed */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Premium Token Sale</CardTitle>
                    <CardDescription>2,500,000 tokens</CardDescription>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Final Price</span>
                    <span className="font-bold text-xl">$0.22</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Raised</span>
                    <span className="font-medium">$550,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">1,247</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-muted-foreground">100% sold • Cleared 2 hours ago</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" disabled>Auction Ended</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Components Showcase */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">UI Components</h3>
            <p className="text-muted-foreground">Complete component library showcase</p>
          </div>

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>All available button styles and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Default Buttons</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Button Sizes</Label>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon">🚀</Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Button States</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badge Variants</CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Input fields and controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bid">Bid Amount</Label>
                    <Input id="bid" type="number" placeholder="0.00" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive auction updates via email
                      </p>
                    </div>
                    <Switch id="notifications" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-bid">Auto-bid</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically place bids at floor price
                      </p>
                    </div>
                    <Switch id="auto-bid" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Tab */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest auction activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Auction</TableHead>
                        <TableHead>Participant</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Token Sale Alpha</TableCell>
                        <TableCell>0x7d2f...a3c8</TableCell>
                        <TableCell>$1,400</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">NFT Collection</TableCell>
                        <TableCell>0x9e1b...f2d4</TableCell>
                        <TableCell>0.32 ETH</TableCell>
                        <TableCell><Badge>Confirmed</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Premium Sale</TableCell>
                        <TableCell>0x4a8c...e9b1</TableCell>
                        <TableCell>$5,500</TableCell>
                        <TableCell><Badge>Confirmed</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>Skeleton components for async content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full max-w-[250px]" />
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Alert>
                <AlertTitle>Auction Starting Soon</AlertTitle>
                <AlertDescription>
                  A new token sale will begin in 15 minutes. Set your max bid now.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTitle>Transaction Failed</AlertTitle>
                <AlertDescription>
                  Your bid could not be processed. Please check your wallet balance and try again.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>User Profiles</CardTitle>
                  <CardDescription>Avatar components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">0x7d2f...a3c8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Color Palette Display */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Color System</h3>
            <p className="text-muted-foreground">Current theme color palette</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-primary border" />
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-muted-foreground">Main brand color</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-secondary border" />
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-muted-foreground">Supporting color</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-accent border" />
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-muted-foreground">Highlight color</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-muted border" />
              <p className="text-sm font-medium">Muted</p>
              <p className="text-xs text-muted-foreground">Subtle backgrounds</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-foreground mb-2">Fairdrop</h4>
              <p className="text-sm text-muted-foreground">
                Fair price discovery for the Web3 era
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">Resources</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Whitepaper</a></li>
                <li><a href="#" className="hover:text-primary">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">Contact</h4>
              <p className="text-sm text-muted-foreground">xpldevelopers@gmail.com</p>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Fairdrop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
