import { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../components/ui/ui/tooltip";
import { buttonVariants } from "../../../components/ui/ui/button";
import React from "react";

interface NavProps {
  isCollapsed: boolean;
  activeSection: string; 
  links: {
    title: string;
    label?: string | LucideIcon | React.ReactNode;
    icon: LucideIcon;
    variant: "default" | "ghost";
    onClick?: () => void; // Optional onClick handler
  }[];
}

export function Nav({ links, isCollapsed, activeSection }: NavProps) {
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2  group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={link.onClick} 
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    activeSection === link.title ? "bg-blue-500 text-white" : "" 
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {typeof link.label === 'string' || typeof link.label === 'number' ? link.label : ''}
                    {React.isValidElement(link.label) ? link.label : null}
                  </span>
                )}
                <link.icon className="nav-icon" />
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              key={index}
              onClick={link.onClick} 
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
                activeSection === link.title ? "bg-slate-900 text-white" : "" 
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span className={cn("ml-auto", link.variant === "default" && "text-background dark:text-white")}>
                  {typeof link.label === 'string' || typeof link.label === 'number' ? link.label : ''}  {React.isValidElement(link.label) ? link.label : null}
                </span>
              )}
            </button>
          )
        )}
      </nav>
    </div>
  );
}
