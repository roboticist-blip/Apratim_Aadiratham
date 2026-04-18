import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APPLY_URL } from "@/lib/event-config";
import logo from "@/assets/logo.jpg";

const links = [
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="w-full border-b border-border/60 bg-background">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-24"
        }`}
      >
        <a href="#top" className="flex items-center gap-3 font-display font-bold">
          <img
            src={logo}
            alt="Robotics and Drone Club logo"
            className={`rounded-lg object-cover ring-1 ring-border transition-all duration-300 ease-out ${
              scrolled ? "size-10" : "size-16"
            }`}
          />
          <span
            className={`hidden tracking-tight transition-all duration-300 ease-out sm:inline ${
              scrolled ? "text-lg" : "text-2xl"
            }`}
          >
            Robotics and Drone Club
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Apply
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2 w-full">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
