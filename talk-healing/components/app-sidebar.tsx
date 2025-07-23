import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const RibbonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" />
    <path d="m12 18 2.57-3.5" />
    <path d="M6.243 9.016a7 7 0 0 1 11.507-.009" />
    <path d="M9.35 14.53 12 11.22" />
    <path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z" />
  </svg>
)

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Chat",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Hypertension (High Blood Pressure)",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Diabetes",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Coronary Artery Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Stroke",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Cancer",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Asthma",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Alzheimer's Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Chronic Obstructive Pulmonary Disease",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Arthritis",
    url: "#",
    icon: RibbonIcon,
  },
  {
    title: "Influenza (Flu)",
    url: "#",
    icon: RibbonIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Talkhealing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}