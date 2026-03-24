import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales",
};

export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32">
      <h1 className="text-3xl font-light text-stone-900 mb-12">Mentions legales</h1>
      <div className="prose prose-stone">
        <p className="text-stone-500">A completer avec les mentions legales.</p>
      </div>
    </div>
  );
}
