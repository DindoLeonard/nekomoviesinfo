"use client";

import { IMovieInfo } from "@consumet/extensions";

export function TrailerPlayer({
  mediaInfo,
  className,
}: {
  mediaInfo: IMovieInfo;
  className?: string;
}) {
  const tailerData = mediaInfo?.trailer as
    | { id: string; site: string; url?: string }
    | undefined;
  const trailerId = tailerData?.id || undefined;

  if (!trailerId) return null;
  return (
    <div>
      <p>trailer:</p>

      <iframe
        className="w-full lg:w-[30vw] aspect-video"
        src={`https://www.youtube.com/embed/${trailerId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
