import type { StaticImageData } from "next/image";
import hero from "@/assets/pilot/01-hero.png";
import areaEvents from "@/assets/pilot/02-area-events-operations.png";
import areaGrowth from "@/assets/pilot/03-area-growth-engagement.png";
import areaAthletes from "@/assets/pilot/04-area-athletes-performance.png";
import areaManagement from "@/assets/pilot/05-area-management-reporting.png";
import eventPlanning from "@/assets/pilot/06-cap-event-planning-coordination.png";
import venue from "@/assets/pilot/07-cap-venue-facility-management.png";
import registration from "@/assets/pilot/08-cap-registration-administration.png";
import staff from "@/assets/pilot/09-cap-staff-volunteer-management.png";
import socialMedia from "@/assets/pilot/10-cap-social-media-campaigns.png";
import fanEngagement from "@/assets/pilot/12-cap-fan-engagement-ticketing.png";
import membership from "@/assets/pilot/13-cap-membership-customer-management.png";
import talentIdentification from "@/assets/pilot/14-cap-talent-identification-development.png";
import careerWelfare from "@/assets/pilot/17-cap-athlete-career-welfare.png";
import dashboards from "@/assets/pilot/18-cap-dashboards-reporting.png";
import programmes from "@/assets/pilot/19-cap-sports-programme-management.png";
import funding from "@/assets/pilot/20-cap-funding-impact-reporting.png";
import governance from "@/assets/pilot/21-cap-governance-compliance.png";
import sponsorship from "@/assets/pilot/11-cap-sponsorship-management.png";
import training from "@/assets/pilot/15-cap-training-performance-monitoring.png";
import video from "@/assets/pilot/16-cap-video-analysis-scouting.png";

/**
 * IMAGE PILOT (local preview only, branch revivo-image-pilot).
 * Generated concept photography (1672×941). Illustrative mood only — never
 * client work or Revivo products. Masters to be confirmed before going live.
 */
export const pilotHero: StaticImageData = hero;

/**
 * `tone` evens out each photograph so the set reads as one family on every device (source files
 * untouched). Values are solved, not eyeballed: after the shared grade every daylight photo lands at
 * the same upper-mid brightness (75th percentile ≈76/255) and colour strength (≈42%), without ever
 * adding more than 5% colour (scratchpad tone/solve.py, Nov 2026). Re-solve when an image changes.
 */
type PanelImage = { src: StaticImageData; position?: string; tone?: string };

/** One image per area: the header for any capability without its own image. */
const areaImages: Record<string, PanelImage> = {
  "events-operations": { src: areaEvents, position: "60% 45%", tone: "saturate(0.93) brightness(0.94)" },
  "growth-engagement": { src: areaGrowth, position: "50% 40%", tone: "saturate(0.9) brightness(1)" },
  "athletes-performance": { src: areaAthletes, position: "50% 30%", tone: "saturate(1.05) brightness(0.85)" },
  "management-reporting": { src: areaManagement, position: "50% 40%", tone: "saturate(1) brightness(0.8)" },
};

/** Capability-specific images, keyed by capability id. */
const capabilityImages: Record<string, PanelImage> = {
  // Final batch 2 (06–10): full-resolution 1672×941.
  "event-planning-coordination": {
    src: eventPlanning,
    position: "50% 30%",
    tone: "saturate(0.96) brightness(0.88)",
  },
  "venue-facility-management": { src: venue, position: "50% 30%", tone: "saturate(0.92) brightness(0.96)" },
  "registration-administration": {
    src: registration,
    position: "50% 20%",
    tone: "saturate(1.05) brightness(0.9)",
  },
  "staff-volunteer-management": { src: staff, position: "50% 25%", tone: "saturate(1.05) brightness(0.9)" },
  "social-media-campaigns": {
    src: socialMedia,
    position: "50% 35%",
    tone: "saturate(1.05) brightness(0.8)",
  },
  // Final batch 3 (11–15): full-resolution 1672×941.
  "sponsorship-management": {
    src: sponsorship,
    position: "50% 25%",
    tone: "saturate(1.05) brightness(0.92)",
  },
  "fan-engagement-ticketing": {
    src: fanEngagement,
    position: "50% 25%",
    tone: "saturate(0.76) brightness(0.86)",
  },
  "membership-customer-management": {
    src: membership,
    position: "50% 30%",
    tone: "saturate(0.89) brightness(0.8)",
  },
  "talent-identification-development": {
    src: talentIdentification,
    position: "50% 25%",
    // interim: softer contrast for its backlight until the photo is regenerated
    tone: "contrast(0.93) brightness(0.8)",
  },
  "training-performance-monitoring": {
    src: training,
    position: "50% 25%",
    tone: "saturate(0.87) brightness(0.9)",
  },
  "video-analysis-scouting": { src: video, position: "50% 30%", tone: "saturate(0.93) brightness(1)" },
  // Final batch 4 (16–21): full-resolution 1672×941.
  "athlete-career-welfare": {
    src: careerWelfare,
    position: "50% 30%",
    tone: "saturate(0.92) brightness(0.8)",
  },
  "dashboards-reporting": { src: dashboards, position: "50% 30%", tone: "saturate(0.79) brightness(1.12)" },
  "sports-programme-management": {
    src: programmes,
    position: "50% 35%",
    tone: "saturate(0.73) brightness(0.87)",
  },
  "funding-impact-reporting": {
    src: funding,
    position: "50% 30%",
    tone: "saturate(1.05) brightness(0.8)",
  },
  "governance-compliance": { src: governance, position: "50% 30%", tone: "saturate(1.05) brightness(1.06)" },
};

/** The image for a solution area (explorer backdrop on desktop, strip on phones/tablets). */
export function areaImage(zoneId: string): PanelImage | undefined {
  return areaImages[zoneId];
}

export function panelImage(capId: string, zoneId: string): PanelImage | undefined {
  return capabilityImages[capId] ?? areaImages[zoneId];
}

/** How Revivo works: one existing image as a quiet atmospheric layer (desktop only). */
export const processImage: PanelImage = {
  src: eventPlanning,
  position: "45% 30%",
  tone: "saturate(0.96) brightness(0.88)", // same as its capability panel
};
