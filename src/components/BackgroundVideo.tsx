import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const base = import.meta.env.BASE_URL;
const asset = (path: string) => base + path;

interface BackgroundVideoProps {
  reducedMotion: boolean;
}

export function BackgroundVideo({ reducedMotion }: BackgroundVideoProps) {
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  // Render the video as soon as the first client render allows it. The poster
  // remains visible while the browser buffers the first frames.
  const [shouldLoad, setShouldLoad] = useState(!reducedMotion);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    if (reducedMotion || connection?.saveData) {
      setShouldLoad(false);
      return;
    }

    setShouldLoad(true);
  }, [reducedMotion]);

  const poster = asset("bg-poster.jpg");

  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(" + poster + ")" }}
        aria-hidden="true"
      />

      {shouldLoad && (
        <video
          key={isSmallScreen ? "small" : "large"}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className="fixed inset-0 z-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source
            src={asset(
              isSmallScreen ? "background-mobile.mp4" : "background.mp4"
            )}
            type="video/mp4"
          />
        </video>
      )}
    </>
  );
}
