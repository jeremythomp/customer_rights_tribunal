import {
  CheckCircle2,
  MessageSquare,
  CheckSquare,
  FileText,
  Calendar,
  User,
  HelpCircle,
  Mail,
  FolderOpen,
} from "lucide-react";
import { ActivityItem, QuickLink, DashboardStats } from "@/types/dashboard";

export function getPlaceholderActivities(userName?: string): ActivityItem[] {
  return [
    {
      id: "1",
      type: "status_update",
      caseNumber: "C2024-045",
      description: "New status update for case #C2024-045: Under Review",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: CheckCircle2,
      href: "/cases/C2024-045",
    },
    {
      id: "2",
      type: "message",
      caseNumber: "C2024-012",
      description: "New message from mediator regarding case #C2024-012",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: MessageSquare,
      href: "/cases/C2024-012/messages",
    },
    {
      id: "3",
      type: "filed",
      caseNumber: "C2024-045",
      description: "Complaint #C2024-045 successfully filed.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      icon: CheckSquare,
      href: "/cases/C2024-045",
    },
  ];
}

export function getPlaceholderQuickLinks(): QuickLink[] {
  return [
    {
      id: "1",
      label: "My Profile & Settings",
      href: "/dashboard/consumer/profile",
      icon: User,
    },
    {
      id: "2",
      label: "Documents",
      href: "/dashboard/consumer/documents",
      icon: FolderOpen,
    },
    {
      id: "3",
      label: "Help Center & FAQ",
      href: "/help",
      icon: HelpCircle,
    },
    {
      id: "4",
      label: "Contact Support",
      href: "/support",
      icon: Mail,
    },
  ];
}

export function getPlaceholderStats(): DashboardStats {
  return {
    activeCases: 2,
    pendingActions: 1,
    unreadMessages: 3,
    upcomingHearings: 0,
  };
}

export function getWelcomeMessage(firstName?: string | null): string {
  const name = firstName || "there";
  return `Welcome to your Dashboard, ${name}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes < 1) return "just now";
      return `${diffInMinutes}m ago`;
    }
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return "1d ago";
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}w ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months}mo ago`;
  }
}

