import { getSearchMovie } from "@/server-actions";
import { Pagination } from "./search-form";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getTitle } from "@/lib/utils";
import Image from "next/image";

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
    title: `Search trending movies series online - nekoanime`,
    description: `search trending movies online free in HD.`,
    keywords: [
      `search trending movies online`,
      `search trending tv shows online`,
      `search trending movies online free`,
    ],
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const response = await getSearchMovie({
    name: (searchParams?.s as string) || "",
    page: Number((searchParams?.page as string) || 1),
  });

  return (
    <main className="mt-4">
      <div className="lg:w-[80vw]">
        {response?.results && (
          <>
            <Pagination hasNextPage={response?.hasNextPage || false} />
            <p>{`total results: ${
              response?.totalResults || response?.results?.length || 0
            }`}</p>
          </>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {response?.results?.map((movie) => {
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
                <p>{movie?.type}</p>
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
