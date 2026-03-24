import { getCalendlyUrl } from "@/lib/sanity";

export async function CTA() {
  const calendlyUrl = await getCalendlyUrl();

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-6">
          Prete a avancer ?
        </h2>
        <p className="text-lg text-stone-500 mb-12 leading-relaxed">
          Le premier pas est souvent le plus important.
          Echangeons pour definir ensemble votre prochain cap.
        </p>
        {calendlyUrl && (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-sm tracking-wider uppercase bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300"
          >
            Reserver un echange
          </a>
        )}
      </div>
    </section>
  );
}
