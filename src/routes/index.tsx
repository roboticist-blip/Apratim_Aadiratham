import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

// Defer below-the-fold sections to reduce initial JS bundle size.
const EventsSection = lazy(() =>
  import("@/components/landing/EventsSection").then((m) => ({
    default: m.EventsSection,
  })),
);
const AboutSection = lazy(() =>
  import("@/components/landing/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/landing/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);
const Footer = lazy(() =>
  import("@/components/landing/Footer").then((m) => ({ default: m.Footer })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Apratim Adirtham 2026 — Robotics & Drone Fest | May 14–15",
      },
      {
        name: "description",
        content:
          "Apratim Adirtham is a 2-day inter-college robotics & drone fest by the R&D Club. Compete in Robo Race, Drone Race, Robo Wrestling, Circuit Mania and more on May 14–15, 2026.",
      },
      { property: "og:title", content: "Apratim Adirtham 2026 — Robotics & Drone Fest" },
      {
        property: "og:description",
        content:
          "2-day inter-college robotics & drone fest. 6 events, ₹40K+ prize pool. May 14–15, 2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <EventsSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
