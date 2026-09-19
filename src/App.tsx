import { useCallback, useState } from "react";
import { About } from "@/components/About";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Lightbox } from "@/components/Lightbox";
import { Navbar } from "@/components/Navbar";
import { artworks } from "@/data/artworks";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? index : (index - 1 + artworks.length) % artworks.length
    );
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? index : (index + 1) % artworks.length
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <BackgroundVideo reducedMotion={reducedMotion} />
      <div className="fixed inset-0 z-0 bg-background/50" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <Hero />
        <Gallery artworks={artworks} onOpen={openLightbox} />
        <About />
        <Footer />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          artworks={artworks}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}

export default App;
