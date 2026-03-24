import { getMirrorItems } from "@/lib/sanity";

export async function MirrorSection() {
  const items = await getMirrorItems();

  // Fallback
  const displayItems = items.length > 0 ? items : [
    { _id: "1", title: "Retrouver confiance", description: "Dans les moments ou le doute s'installe, retrouver l'assurance qui permet d'avancer." },
    { _id: "2", title: "Oser le changement", description: "Transformer une transition en opportunite, avec clarte et serenite." },
    { _id: "3", title: "Reveler son potentiel", description: "Aller au-dela de ce que l'on croit possible, avec un regard bienveillant." },
  ];

  return (
    <section id="approche" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 text-center mb-4">
          Approche
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
          Des moments de vie, formules positivement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayItems.map((item) => (
            <div key={item._id} className="text-center">
              <h3 className="text-xl font-medium text-stone-900 mb-4">
                {item.title}
              </h3>
              <p className="text-stone-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
