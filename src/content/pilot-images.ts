import type { StaticImageData } from "next/image";
import hero from "@/assets/pilot/01-hero.png";
import areaEvents from "@/assets/pilot/02-area-events-operations.png";
import areaGrowth from "@/assets/pilot/03-area-growth-engagement.png";
import areaAthletes from "@/assets/pilot/04-area-athletes-performance.png";
import areaManagement from "@/assets/pilot/05-area-management-reporting.png";
import sponsorship from "@/assets/pilot/11-cap-sponsorship-management.png";
import training from "@/assets/pilot/15-cap-training-performance-monitoring.png";
import video from "@/assets/pilot/16-cap-video-analysis-scouting.png";

/**
 * IMAGE PILOT (local preview only, branch revivo-image-pilot).
 * Generated concept photography (1672×941). Illustrative mood only — never
 * client work or Revivo products. Masters to be confirmed before going live.
 */
export const pilotHero: StaticImageData = hero;

type PanelImage = { src: StaticImageData; position?: string };

/** One image per area: the header for any capability without its own image. */
const areaImages: Record<string, PanelImage> = {
  "events-operations": { src: areaEvents, position: "60% 45%" },
  "growth-engagement": { src: areaGrowth, position: "50% 40%" },
  "athletes-performance": { src: areaAthletes, position: "50% 30%" },
  "management-reporting": { src: areaManagement, position: "50% 40%" },
};

/** Capability-specific images, keyed by capability id. */
const capabilityImages: Record<string, PanelImage> = {
  "sponsorship-management": { src: sponsorship, position: "50% 45%" },
  "training-performance-monitoring": { src: training, position: "50% 35%" },
  "video-analysis-scouting": { src: video, position: "50% 40%" },
};

export function panelImage(capId: string, zoneId: string): PanelImage | undefined {
  return capabilityImages[capId] ?? areaImages[zoneId];
}
