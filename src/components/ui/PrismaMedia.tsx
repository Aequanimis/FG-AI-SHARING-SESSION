import { useState } from "react";

type PrismaVideoProps = {
  src: string;
  className?: string;
  label: string;
  noise?: boolean;
};

export function PrismaVideo({ src, className = "", label, noise = false }: PrismaVideoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`prisma-video ${className} ${failed ? "is-fallback" : ""}`} aria-label={label}>
      {!failed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {failed && <div className="video-fallback"><span>MEDIA FALLBACK</span><strong>{label}</strong></div>}
      <div className="video-shade" aria-hidden="true" />
      {noise && <div className="video-noise" aria-hidden="true" />}
    </div>
  );
}
