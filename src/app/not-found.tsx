import { SignalGlyph } from "@/components/signal/SignalGlyph";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[75svh] flex-col justify-center pt-24 pb-16">
      <div className="container-site">
        <SignalGlyph className="h-8 w-20" />
        <p className="label mt-8 text-subtle">Page not found</p>
        <h1 className="text-title mt-4 max-w-3xl">We lost the signal on this page.</h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
        </div>
      </div>
    </div>
  );
}
