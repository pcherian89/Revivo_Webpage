import type { StaticImageData } from "next/image";
import hero from "@/assets/pilot/01-hero.png";
import sponsorship from "@/assets/pilot/11-cap-sponsorship-management.png";
import training from "@/assets/pilot/15-cap-training-performance-monitoring.png";
import video from "@/assets/pilot/16-cap-video-analysis-scouting.png";

/**
 * IMAGE PILOT (local preview only, branch revivo-image-pilot).
 * Low-resolution concept crops (~765×443) used to judge the art direction.
 * They are illustrative mood, never client work, and are replaced by
 * full-resolution masters once a direction is approved.
 */
export const pilotHero: StaticImageData = hero;

/** Capability panel header images, keyed by capability id. */
export const pilotPanelImages: Record<string, { src: StaticImageData; position?: string }> = {
  "sponsorship-management": { src: sponsorship, position: "50% 45%" },
  "training-performance-monitoring": { src: training, position: "50% 40%" },
  "video-analysis-scouting": { src: video, position: "50% 45%" },
};
