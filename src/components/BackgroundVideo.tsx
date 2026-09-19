import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const base = import.meta.env.BASE_URL;
const asset = (path: string) => base + path;

interface BackgroundVideoProps {
  reducedMotion: boolean;
}

export function BackgroundVideo({ reducedMotion }: BackgroundVideoProps) {
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion || connection?.saveData) {
      setShouldLoad(false);
      return;
    }
    const timer = window.setTimeout(() => setShouldLoad(true), 900);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const poster = asset("bg-poster.jpg");
  return (
    <>
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(" + poster + ")" }} aria-hidden="true" />
      {shouldLoad && (
        <video key={isSmallScreen ? "small" : "large"} autoPlay loop muted playsInline preload="metadata" poster={poster} className="fixed inset-0 z-0 h-full w-full object-cover" aria-hidden="true">
          <source src={asset(isSmallScreen ? "background-mobile.mp4" : "background.mp4")} type="video/mp4" />
        </video>
      )}
    </>
  );
}
