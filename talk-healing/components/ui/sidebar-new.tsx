"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

interface SidebarContextType {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div
        className={cn(
          "flex h-screen w-[250px] flex-col border-r bg-gray-50/50 transition-all duration-300",
          expanded ? "w-[250px]" : "w-[70px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-auto p-4", className)}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-14 items-center border-t px-4", className)}
      {...props}
    />
  )
}

export function SidebarItem({
  className,
  children,
  icon: Icon,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ElementType
}) {
  const { expanded } = React.useContext(SidebarContext) || { expanded: true }

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {expanded && <span className="ml-3">{children}</span>}
    </div>
  )
}

export function SidebarToggle() {
  const { expanded, setExpanded } = React.useContext(SidebarContext) || {}

  if (!setExpanded) return null

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="absolute -right-3 top-6 z-10 rounded-full border bg-white p-1.5 shadow-md"
    >
      <svg
        className={cn("h-4 w-4 transform transition-transform", 
          expanded ? "rotate-0" : "rotate-180"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  )
}
