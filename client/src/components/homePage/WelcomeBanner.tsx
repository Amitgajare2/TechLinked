import Image from "next/image";

export default function WelcomeBanner({ name = "Kundan" }: { name?: string }) {
  return (
    <div className="relative overflow-hidden rounded-card bg-sand">
      <div className="relative z-10 max-w-md px-5 py-6 sm:px-7 sm:py-8">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-orange">
          Welcome back, {name}
        </p>
        <h1 className="mt-2 font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
          Grow. Connect. Build a career in Hospitality.
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Share experiences, learn with peers, and discover opportunities in the
          global hospitality community.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 sm:block">
        <Image
          src="/images/hero-reception.jpg"
          alt="A hotel reception desk decorated with fresh flowers"
          fill
          sizes="(min-width: 1024px) 420px, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sand via-sand/10 to-transparent" />
      </div>
    </div>
  );
}
