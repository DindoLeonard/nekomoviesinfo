import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getTitle } from "@/lib/utils";
import { getTrendingMovies } from "@/server-actions";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Recent() {
  const data = await getTrendingMovies();
  cookies();

  return (
    <main className="bg-background flex flex-col justify-center items-center min-h-screen p-2 ">
      <div className="lg:w-[80vw]">
        <p className="text-primary text-lg text-center">Trending Movies</p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
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
                <p className="break-words underline">{getTitle(movie.title)}</p>
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
