import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const base = import.meta.env.BASE_URL;
const asset = (path: string) => base + path;

interface BackgroundVideoProps {
  reducedMotion: boolean;
}

export function BackgroundVideo({ reducedMotion }: BackgroundVideoProps) {
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const videoRef = useRef<HTMLVideoElement>(null);
  const desktopVideo = asset("background.mp4");
  const fallbackVideo = asset("background-mobile.mp4");
  const [shouldLoad, setShouldLoad] = useState(!reducedMotion);
  const [videoSource, setVideoSource] = useState(desktopVideo);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;

    if (reducedMotion) {
      setShouldLoad(false);
      return;
    }

    const slowConnection =
      connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");

    setVideoSource(
      isSmallScreen || slowConnection ? fallbackVideo : desktopVideo
    );
    setRetryCount(0);
    setShouldLoad(true);
  }, [desktopVideo, fallbackVideo, isSmallScreen, reducedMotion]);

  const requestPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => undefined);
  }, []);

  const recoverPlayback = useCallback(() => {
    if (videoSource !== fallbackVideo) {
      setVideoSource(fallbackVideo);
      setRetryCount(0);
      return;
    }

    setRetryCount((count) => Math.min(count + 1, 3));
  }, [fallbackVideo, videoSource]);

  useEffect(() => {
    if (!shouldLoad) return;

    const resumeWhenVisible = () => {
      if (!document.hidden) requestPlayback();
    };

    const watchdog = window.setTimeout(() => {
      const video = videoRef.current;
      if (!video || video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        recoverPlayback();
      } else {
        requestPlayback();
      }
    }, 7000);

    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pageshow", requestPlayback);
    requestPlayback();

    return () => {
      window.clearTimeout(watchdog);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pageshow", requestPlayback);
    };
  }, [recoverPlayback, requestPlayback, retryCount, shouldLoad, videoSource]);

  const poster = asset("bg-poster.jpg");
  const source = videoSource + (retryCount ? "?retry=" + retryCount : "");

  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(" + poster + ")" }}
        aria-hidden="true"
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          key={source}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className="fixed inset-0 z-0 h-full w-full object-cover"
          aria-hidden="true"
          onCanPlay={requestPlayback}
          onLoadedData={requestPlayback}
          onError={recoverPlayback}
        >
          <source src={source} type="video/mp4" />
        </video>
      )}
    </>
  );
}
