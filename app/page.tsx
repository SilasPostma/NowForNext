"use client";
import Panels from "@/components/ui/panels";
import Header from "@/components/ui/header";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { SECTION_IDS } from "@/config/sections";

export default function HomePage() {
  const activeId = useScrollSpy([...SECTION_IDS]);

  return (
    <main className="w-full">
      <Header activeId={activeId} />
      <Panels activeId={activeId} />
    </main>
  );
}
