import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { EyeLogo } from "./EyeLogo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium px-3 py-2 rounded-lg transition-smooth hover:bg-secondary",
      isActive ? "text-primary" : "text-foreground/80"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-teal text-primary-foreground shadow-glow">
            <EyeLogo className="h-5 w-5" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            {t("brand.name")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/demo" className={navLinkClass}>
            {t("nav.demo")}
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2 gradient-teal text-primary-foreground shadow-glow hover:opacity-90">
            <a href="https://eyetracking.boos.uz" target="_blank" rel="noreferrer">
              {t("nav.cta")}
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-2">
            <NavLink to="/" end className={navLinkClass}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/demo" className={navLinkClass}>
              {t("nav.demo")}
            </NavLink>
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Button asChild size="sm" className="gradient-teal text-primary-foreground">
              <a href="https://eyetracking.boos.uz" target="_blank" rel="noreferrer">
                {t("nav.cta")}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
