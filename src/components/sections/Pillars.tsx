import { getPillars } from "@/lib/sanity";
import { Crown, ArrowRightLeft, Target } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  crown: Crown,
  transition: ArrowRightLeft,
  target: Target,
};

const defaultPillars = [
  { _id: "1", title: "Leadership", description: "Developper votre posture de leader authentique, affirmer votre vision et embarquer vos equipes.", icon: "crown", order: 1 },
  { _id: "2", title: "Transition", description: "Accompagner vos changements de cap avec clarte : reconversion, prise de poste, evolution.", icon: "transition", order: 2 },
  { _id: "3", title: "Performance", description: "Atteindre vos objectifs avec methode, en alignant vos actions avec vos valeurs profondes.", icon: "target", order: 3 },
];

export async function Pillars() {
  const pillars = await getPillars();
  const displayPillars = pillars.length > 0 ? pillars : defaultPillars;

  return (
    <section id="piliers" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 text-center mb-4">
          Piliers
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
          Trois axes d&apos;accompagnement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPillars.map((pillar) => {
            const Icon = iconMap[pillar.icon || "target"] || Target;
            return (
              <div
                key={pillar._id}
                className="bg-white p-8 rounded-lg border border-stone-100 hover:border-stone-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-stone-700" />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
