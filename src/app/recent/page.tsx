import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getTitle } from "@/lib/utils";
import { getRecentMovies, getTrendingMovies } from "@/server-actions";
import Image from "next/image";
import Link from "next/link";
import { ResolvingMetadata } from "next";

type Props = {
  params: { id: string; type: string; title: string };
  searchParams: { season: string; episode: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
) {
  return {
    title: `Watch recent movies online - nekoanime`,
    description: `Watch recent movies online free in HD`,
    keywords: [
      `watch recent movies online`,
      `watch recent movie online`,
      `watch recent movies online free`,
    ],
  };
}

export default async function Recent() {
  const data = await getRecentMovies();
  return (
    <main className="bg-background flex flex-col justify-center items-center min-h-screen p-2">
      <div className="lg:w-[80vw]">
        <p className="text-primary text-lg text-center">Recent Movies</p>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          {data?.results?.map((movie) => {
            return (
              <Link
                href={`/watch/${encodeURIComponent(
                  movie?.type?.toLowerCase() || ""
                )}/${encodeURIComponent(movie.id)}/${encodeURIComponent(
                  getTitle(movie?.title)
                )}`}
                key={movie.id}
                className="group"
              >
                <div className="overflow-hidden">
                  <AspectRatio ratio={250 / 357}>
                    <Image
                      fill
                      alt=""
                      src={movie?.image || ""}
                      className="group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
                    />
                  </AspectRatio>
                </div>
                <p className="break-words">{getTitle(movie.title)}</p>
                <p>{movie?.releaseDate}</p>
                {(movie?.duration as string) && (
                  <p>{movie?.duration as string}</p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
