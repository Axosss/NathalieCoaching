import Image from "next/image";
import { getPhotos, urlFor } from "@/lib/sanity";

export async function Gallery() {
  const photos = await getPhotos();

  if (photos.length === 0) {
    return (
      <section id="galerie" className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm tracking-[0.3em] uppercase text-stone-400 text-center mb-4">
            Galerie
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
            En images
          </h2>
          <p className="text-stone-400 text-center">
            Photos a ajouter dans Sanity Studio
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="galerie" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 text-center mb-4">
          Galerie
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
          En images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => {
            const imageUrl = urlFor(photo.image).width(600).height(400).url();
            if (!imageUrl) return null;
            return (
              <div key={photo._id} className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={photo.alt || photo.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
