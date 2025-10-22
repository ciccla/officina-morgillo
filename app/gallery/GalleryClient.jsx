"use client";

import Image from "next/image";

export default function GalleryClient({ foto, video }) {
  return (
    <>
      {/* FOTO */}
      {foto.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            📸 <span className="text-white">Le nostre</span>{" "}
            <span className="text-blue-400 uppercase">FOTO</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {foto.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-lg hover:scale-[1.03] transition-transform duration-300"
              >
                <Image
                  src={src}
                  alt={`Foto ${i + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIDEO */}
      {video.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            🎥 <span className="text-white">I nostri</span>{" "}
            <span className="text-blue-400 uppercase">VIDEO</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {video.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#1a1e23] shadow-lg hover:scale-[1.02] transition-transform"
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  muted
                  className="w-full rounded-2xl bg-black hover:opacity-90 transition
                             aspect-video object-contain sm:object-cover"
                  style={{
                    transform: "rotate(0deg)", // blocca rotazione automatica
                    maxHeight: "80vh",          // non supera l'altezza schermo
                    backgroundColor: "#000",    // sfondo nero uniforme
                  }}
                  onLoadedMetadata={(e) => {
                    // mostra il primo frame come anteprima
                    e.target.currentTime = 0.1;

                    // rileva se il video è verticale per adattare la classe
                    const isVertical =
                      e.target.videoHeight > e.target.videoWidth;
                    if (isVertical) {
                      e.target.classList.remove("aspect-video");
                      e.target.classList.add("aspect-[9/16]");
                    }
                  }}
                >
                  <source src={src} type="video/mp4" />
                  <source src={src} type="video/webm" />
                  <source src={src} type="video/quicktime" />
                  Il tuo browser non supporta il video HTML5.
                </video>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
