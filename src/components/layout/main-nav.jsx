"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({ className, ...props }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <Activity className="h-6 w-6" />
        <span className="font-bold">TestifAI</span>
      </Link>
      <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary" asChild>
        <Link href="/dashboard" className={pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"}>
          Overview
        </Link>
      </Button>
      <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary" asChild>
        <Link href="/projects" className={pathname === "/projects" ? "text-primary" : "text-muted-foreground"}>
          Projects
        </Link>
      </Button>
      <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary" asChild>
        <Link
          href="/api-endpoints"
          className={pathname === "/api-endpoints" ? "text-primary" : "text-muted-foreground"}
        >
          API Endpoints
        </Link>
      </Button>
    </nav>
  )
}

