import type { Metadata } from "next";
import { ConversationScene } from "@/components/scenes/ConversationScene";
import { FlatlineScene } from "@/components/scenes/FlatlineScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ProcessScene } from "@/components/scenes/ProcessScene";
import { StoryScene } from "@/components/scenes/StoryScene";
import { jsonLdScript, organizationJsonLd, servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: "Revivo — AI that gives sport a pulse | Custom AI solutions for sport and fitness" },
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/** Five scenes, one idea each: understand → recognize → believe → trust the process → start. */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([organizationJsonLd(), servicesJsonLd()]) }}
      />
      <HeroScene />
      <FlatlineScene />
      <StoryScene />
      <ProcessScene />
      <ConversationScene />
    </>
  );
}
