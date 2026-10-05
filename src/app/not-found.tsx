import { HeroSignal } from "@/components/signal/HeroSignal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col justify-center pt-24 pb-16">
      <div className="container-site">
        <p className="eyebrow text-muted">Page not found</p>
        <h1 className="text-title mt-5 max-w-3xl">This page has gone quiet.</h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
        </div>
      </div>
      <div className="mt-16">
        <HeroSignal />
      </div>
    </div>
  );
}
