import { LucideIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  type: "status_update" | "message" | "filed" | "document" | "hearing";
  caseNumber: string;
  description: string;
  timestamp: Date;
  icon: LucideIcon;
  href?: string;
}

export interface QuickLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardStats {
  activeCases: number;
  pendingActions: number;
  unreadMessages: number;
  upcomingHearings: number;
}

export interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "primary" | "secondary";
}

export interface InfoCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

