"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IMovieEpisode } from "@consumet/extensions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function EpisodeSheet({
  seasons,
}: {
  seasons: {
    season: number;
    image?: string | undefined;
    episodes: IMovieEpisode[];
  }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div>
      <Sheet>
        <SheetTrigger className="underline">
          <Button variant="link">SELECT EPISODE/SEASON</Button>
        </SheetTrigger>
        <SheetContent className={"overflow-y-scroll"}>
          {seasons.map((season) => {
            return (
              <SheetHeader key={season.season + "-season"}>
                <SheetTitle
                  className={cn({ "mt-3": season.season !== 1 })}
                >{`Season ${season.season}`}</SheetTitle>
                <div className="grid grid-cols-1 divide-y gap-1">
                  {season.episodes?.map((episode) => {
                    return (
                      <SheetTrigger
                        asChild
                        className="flex flex-col hover:bg-secondary"
                        key={episode?.id + "-episode" + season.season}
                        onClick={() => {
                          const current = new URLSearchParams(
                            Array.from(searchParams.entries())
                          );

                          current.set("season", season.season.toString());
                          current.set("episode", (episode as any).episode);
                          const query = `?${current.toString()}`;
                          router.push(`${pathname}${query}`);
                        }}
                      >
                        <SheetDescription className="text-primary">
                          <div>
                            <p className="text-start">
                              {(episode as any).episode as string}
                              <span> - {episode.title}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-start">
                              {new Date(episode?.releaseDate as string) >
                              new Date() ? (
                                <span className="text-muted-foreground">
                                  coming: {episode?.releaseDate}
                                </span>
                              ) : (
                                episode?.releaseDate
                              )}
                            </p>
                          </div>
                        </SheetDescription>
                      </SheetTrigger>
                    );
                  })}
                </div>
              </SheetHeader>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
}
