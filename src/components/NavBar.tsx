"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRegistroModal } from "@/components/RegistroModal";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const { openModal } = useRegistroModal();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-heading text-xl font-bold tracking-widest text-foreground">
              LA PIZARRA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#picks"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Los Picks
            </Link>
            <Link
              href="#pick-del-dia"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Pick del Día
            </Link>
            <Link
              href="#precios"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Precios
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com/lapizarraapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de La Pizarra"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={openModal}
            >
              Canal gratis
            </Button>
            <a
              href="#precios"
              className={cn(buttonVariants({ size: "sm" }), "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold")}
            >
              Premium
            </a>
          </div>

          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card w-72 px-6 py-8">
              <SheetTitle className="font-heading text-xl font-bold tracking-widest mb-8">
                LA PIZARRA
              </SheetTitle>
              <nav className="flex flex-col gap-5 mb-8">
                <Link
                  href="#picks"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Los Picks
                </Link>
                <Link
                  href="#pick-del-dia"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pick del Día
                </Link>
                <Link
                  href="#precios"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Precios
                </Link>
                <a
                  href="https://instagram.com/lapizarraapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  @lapizarraapp
                </a>
              </nav>
              <div className="flex flex-col gap-3 pt-6 border-t border-border">
                <div
                  onClick={openModal}
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-[#d4af37] text-[#d4af37] px-4 py-2"
                >
                  Canal gratis
                </div>
                <a
                  href="#precios"
                  className={cn(buttonVariants(), "w-full bg-primary text-primary-foreground font-semibold")}
                >
                  Ver Premium
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
