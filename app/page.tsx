"use client";
import Panels from "@/components/ui/panels";
import Header from "@/components/ui/header";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const allIds = [
  "landing-page",
  "are-you-ready",
  "charge-organisational-batteries",
  "challenge-limiting-beliefs",
  "reset-strategic-direction",
  "build-two-engines",
  "ecosystems-thinking",
  "why-we-started",
  "who-we-are",
];

export default function HomePage() {
  const activeId = useScrollSpy(allIds);

  return (
    <main className="w-full">
      <Header activeId={activeId} />
      <Panels activeId={activeId} />
    </main>
  );
}
