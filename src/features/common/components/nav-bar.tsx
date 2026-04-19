"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/features/utils";
import HudButton from "@/features/common/components/hud-button";
import { siteConfig } from "@/features/common/data/site";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <HudButton href="/#contact" size="sm">
              Contact
            </HudButton>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-border/40 bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm transition-colors",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <HudButton href="/#contact" size="sm" onClick={() => setOpen(false)}>
                Contact
              </HudButton>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
