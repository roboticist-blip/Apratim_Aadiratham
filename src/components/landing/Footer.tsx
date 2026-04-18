import { Cpu } from "lucide-react";
import { EVENT } from "@/lib/event-config";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="size-4" />
          </span>
          <span className="font-display text-sm font-semibold">
            {EVENT.name}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {EVENT.organiser}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
