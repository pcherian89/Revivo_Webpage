import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="pt-16 lg:pt-[4.5rem]">
      <div className="container-site flex min-h-[70svh] flex-col justify-center py-20">
        <p className="text-label text-subtle">
          <span className="text-lime">404</span> / Signal not found
        </p>
        <h1 className="text-display-lg mt-6 max-w-[16ch]">This page is not part of the system.</h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
        </div>
      </div>
    </div>
  );
}
