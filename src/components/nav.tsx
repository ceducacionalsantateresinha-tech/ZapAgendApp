"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  FileText,
  LayoutDashboard,
  Send,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campanhas", icon: Send },
  { href: "/dashboard/contacts", label: "Contatos", icon: Users },
  { href: "/dashboard/templates", label: "Modelos", icon: FileText },
  { href: "/dashboard/ai-assistant", label: "Assistente IA", icon: Bot },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            className={cn(
              "justify-start",
              pathname === link.href && "bg-sidebar-accent"
            )}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
