import { getAbout } from "@/lib/sanity";

export async function About() {
  const about = await getAbout();

  const title = about?.title || "Qui suis-je";
  const content = about?.content || "Un parcours riche, une passion pour l'accompagnement humain. A completer dans Sanity.";

  return (
    <section id="parcours" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 text-center mb-4">
          Parcours
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
          {title}
        </h2>
        <div className="prose prose-stone prose-lg mx-auto text-center">
          <p className="text-stone-600 leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
