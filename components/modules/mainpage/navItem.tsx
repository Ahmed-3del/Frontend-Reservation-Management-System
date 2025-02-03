import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  isActive?: boolean
}

const NavItem = ({ href, icon: Icon, children, isActive }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
      isActive ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white",
    )}
    prefetch={false}
  >
    <Icon className="h-5 w-5" />
    {children}
  </Link>
)

export default NavItem

