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
import athleteManagement from "@/assets/pilot/14-cap-athlete-management-development.png";
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
 * `tone` is a subtle CSS filter that evens out an image's brightness/saturation so the
 * 21 photographs read as one family on the site (source files are left untouched).
 */
type PanelImage = { src: StaticImageData; position?: string; tone?: string };

/** One image per area: the header for any capability without its own image. */
const areaImages: Record<string, PanelImage> = {
  "events-operations": { src: areaEvents, position: "60% 45%" },
  "growth-engagement": { src: areaGrowth, position: "50% 40%" },
  "athletes-performance": { src: areaAthletes, position: "50% 30%" },
  "management-reporting": { src: areaManagement, position: "50% 40%", tone: "brightness(0.93)" },
};

/** Capability-specific images, keyed by capability id. */
const capabilityImages: Record<string, PanelImage> = {
  // Final batch 2 (06–10): full-resolution 1672×941.
  "event-planning-coordination": { src: eventPlanning, position: "50% 30%" },
  "venue-facility-management": { src: venue, position: "50% 30%" },
  "registration-administration": { src: registration, position: "50% 20%" },
  "staff-volunteer-management": { src: staff, position: "50% 25%" },
  "social-media-campaigns": { src: socialMedia, position: "50% 35%" },
  // Final batch 3 (11–15): full-resolution 1672×941.
  "sponsorship-management": { src: sponsorship, position: "50% 25%" },
  "fan-engagement-ticketing": { src: fanEngagement, position: "50% 25%", tone: "saturate(0.9)" },
  "membership-customer-management": { src: membership, position: "50% 30%", tone: "brightness(0.94)" },
  "athlete-management-development": {
    src: athleteManagement,
    position: "50% 25%",
    tone: "brightness(0.9) contrast(1.05)",
  },
  "training-performance-monitoring": { src: training, position: "50% 25%", tone: "saturate(0.92)" },
  "video-analysis-scouting": { src: video, position: "50% 30%", tone: "brightness(1.05)" },
  // Final batch 4 (16–21): full-resolution 1672×941.
  "athlete-career-welfare": {
    src: careerWelfare,
    position: "50% 30%",
    tone: "brightness(0.94) saturate(0.95)",
  },
  "dashboards-reporting": { src: dashboards, position: "50% 30%", tone: "brightness(1.08)" },
  "sports-programme-management": { src: programmes, position: "50% 35%", tone: "saturate(0.92)" },
  "funding-impact-reporting": {
    src: funding,
    position: "50% 30%",
    tone: "brightness(0.88) contrast(1.06) saturate(1.05)",
  },
  "governance-compliance": { src: governance, position: "50% 30%" },
};

/** The image for a solution area (explorer backdrop on desktop, strip on phones/tablets). */
export function areaImage(zoneId: string): PanelImage | undefined {
  return areaImages[zoneId];
}

export function panelImage(capId: string, zoneId: string): PanelImage | undefined {
  return capabilityImages[capId] ?? areaImages[zoneId];
}

/** How Revivo works: one existing image as a quiet atmospheric layer (desktop only). */
export const processImage: PanelImage = { src: eventPlanning, position: "50% 35%" };
