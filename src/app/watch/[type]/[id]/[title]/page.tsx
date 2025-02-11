import { AspectRatio } from "@/components/ui/aspect-ratio";

import { getTitle } from "@/lib/utils";
import { getEpisodeSources, getMediaInfo } from "@/server-actions";
import Image from "next/image";
import VideoPlayerVidSrc from "./__components/video-player";
import { VideoPlayer } from "@/components/video-player/video-player";
import { IMovieInfo } from "@consumet/extensions";
import { Button } from "@/components/ui/button";
import EpisodeSheet from "./__components/episode-sheet";
import { ResolvingMetadata } from "next";
import { Comments } from "@/components/comments";
import { Separator } from "@/components/ui/separator";
import { TrailerPlayer } from "./__components/trailer-player";

type Props = {
  params: { id: string; type: string; title: string };
  searchParams: { season: string; episode: string };
};

export const maxDuration = 60;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
) {
  const episode = searchParams?.episode;
  const season = searchParams?.season;

  return {
    title: `Watch movies online - ${decodeURIComponent(
      params.title
    )} - nekoanime`,
    description: `Watch movie online free in HD. ${decodeURIComponent(
      params?.title
    )}`,
    keywords: [
      `watch ${decodeURIComponent(params.title)}`,
      `watch ${decodeURIComponent(params.title)} season ${season}`,
      `watch ${decodeURIComponent(params.title)} episode ${episode}`,
      `watch ${decodeURIComponent(
        params.title
      )} season ${season} episode ${episode}`,
      `watch ${decodeURIComponent(params.title)} s${season}e${episode}`,
      `watch movies online`,
      `watch movie online`,
      `watch movies online free`,
    ],
  };
}

export default async function Watch({ params, searchParams }: Props) {
  const mediaId = decodeURIComponent(params.id);
  const type = params.type === "movie" ? "movie" : "tv";
  const mediaInfo = (await getMediaInfo(mediaId, type)) as IMovieInfo;

  if (mediaInfo?.seasons) {
  }

  const movieSeasons = mediaInfo?.seasons || [];
  const totalSeasons = movieSeasons?.length || 0;

  // console.log("mediaInfo", mediaInfo);
  // console.log("movieSeasons", movieSeasons);
  // console.log("totalSeasons", totalSeasons);

  console.log(
    `https://vidsrc.cc/v2/embed/${type}/${
      (mediaInfo?.mappings as unknown as any)?.imdb
    }` +
      `${searchParams?.season ? `/${searchParams.season}` : ``}` +
      `${searchParams?.episode ? `/${searchParams.episode}` : ""}`
  );

  return (
    <main className="bg-background flex flex-col items-center min-h-screen p-2">
      <div className="space-y-3 lg:w-[80vw]">
        <div>
          <VideoPlayerVidSrc
            src={
              `https://vidsrc.cc/v2/embed/${type}/${
                (mediaInfo?.mappings as unknown as any)?.imdb
              }` +
              `${searchParams?.season ? `/${searchParams.season}` : ``}` +
              `${searchParams?.episode ? `/${searchParams.episode}` : ""}`
            }
          />
          {/* <VideoPlayer src={mediaId}/> */}
        </div>
        {movieSeasons?.length > 0 && (
          <div className="flex w-full justify-center pt-4">
            <EpisodeSheet seasons={movieSeasons} />
          </div>
        )}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-start space-y-4">
          <div className="w-3/4 lg:w-1/2">
            <AspectRatio ratio={1066 / 600}>
              <Image
                fill
                src={mediaInfo?.cover || mediaInfo?.image || ""}
                alt=""
              />
            </AspectRatio>
          </div>
          <div className="w-3/4 lg:w-1/2 lg:px-4 space-y-2">
            <p className="text-lg font-sans font-semibold text-center lg:text-start">
              {getTitle(mediaInfo?.title)}
            </p>
            <p className="font-sans text-sm text-muted-foreground text-center lg:text-start">
              {mediaInfo?.description}
            </p>
            <p>
              rating:{" "}
              <span className="font-sans text-sm text-muted-foreground">
                {mediaInfo?.rating}
              </span>
            </p>
            {mediaInfo?.duration && (
              <p>
                duration:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {mediaInfo?.duration}
                </span>
              </p>
            )}
            <p>
              release date:{" "}
              <span className="font-sans text-sm text-muted-foreground">
                {mediaInfo?.releaseDate}
              </span>
            </p>
            {totalSeasons !== 0 && (
              <p>
                total seasons:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {totalSeasons}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-start">
          <div className="w-3/4 space-y-2">
            {mediaInfo?.casts && (
              <p>
                cast:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {mediaInfo?.casts?.join(", ")}
                </span>
              </p>
            )}

            {(mediaInfo?.directors as any) && (
              <p>
                directors:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {(mediaInfo?.directors as any).join(", ")}
                </span>
              </p>
            )}

            {(mediaInfo?.actors as any) && (
              <p>
                cast:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {(mediaInfo?.actors as any).join(", ")}
                </span>
              </p>
            )}
            <p>
              genres:{" "}
              <span className="font-sans text-sm text-muted-foreground">
                {mediaInfo?.genres?.join(", ")}
              </span>
            </p>

            {mediaInfo?.production && (
              <p>
                production:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {mediaInfo?.production}
                </span>
              </p>
            )}
            {(mediaInfo?.country as string) && (
              <p>
                country:{" "}
                <span className="font-sans text-sm text-muted-foreground">
                  {mediaInfo?.country as string}
                </span>
              </p>
            )}

            <TrailerPlayer mediaInfo={mediaInfo} />
          </div>
        </div>

        <div>
          <Separator />
        </div>
        <div className="lg:w-[80vw] bg-background">
          <Comments
            className="bg-background text-primary-foreground"
            identifier={`${params.type}-${params.id}-${searchParams?.episode}-${searchParams.season}`}
            pathname={`${params.type}/${params.id}/${params.title}`}
            title={params.title}
          />
        </div>
      </div>
    </main>
  );
}
