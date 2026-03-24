import { getHeroContent, getCalendlyUrl } from "@/lib/sanity";

export async function Hero() {
  const [hero, calendlyUrl] = await Promise.all([
    getHeroContent("home"),
    getCalendlyUrl(),
  ]);

  const title = hero?.title || "Accompagner votre evolution";
  const subtitle = hero?.subtitle || "Coaching professionnel";
  const description = hero?.description || "";

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center">
      {/* Background - placeholder, a remplacer par la vraie photo */}
      <div className="absolute inset-0 bg-stone-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
        {subtitle && (
          <p className="text-sm tracking-[0.3em] uppercase text-stone-500 mb-6">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight mb-8">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            {description}
          </p>
        )}
        {calendlyUrl && (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm tracking-wider uppercase border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            Prendre rendez-vous
          </a>
        )}
      </div>
    </section>
  );
}
