import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { EventsSection } from "@/components/landing/EventsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

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
        <EventsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
