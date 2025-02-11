"use server";

import { META, IMovieResult, ISearch } from "@consumet/extensions";

const metaTmbdProvider = new META.TMDB();

export async function getTrendingMovies() {
  try {
    const data = await metaTmbdProvider.fetchTrending("movie", "week");
    // metaTmbdProvider.
    return data as ISearch<IMovieResult>;
  } catch (e) {
    console.log("error", e);
  }
}

export async function getRecentMovies() {
  try {
    const data = await metaTmbdProvider.fetchTrending("movie", "day");
    return data as ISearch<IMovieResult>;
  } catch (e) {
    console.log("error", e);
  }
}

export async function getRecentTvShows() {
  try {
    const data = await metaTmbdProvider.fetchTrending("tv", "day");
    return data as ISearch<IMovieResult>;
  } catch (e) {
    console.log("error", e);
  }
}

export async function getTrendingTvShows() {
  try {
    const data = await metaTmbdProvider.fetchTrending("tv", "week");
    return data as ISearch<IMovieResult>;
  } catch (e) {
    console.log("error", e);
  }
}

export async function getSearchMovie({
  name,
  page,
}: {
  name?: string;
  page: number;
}) {
  if (!name) return;
  try {
    const data = await metaTmbdProvider.search(name, page);
    return data;
  } catch (e) {
    console.log("error", e);
  }
}

export async function getMediaInfo(id: string, type = "movie") {
  try {
    // const data = await flixHqProvider.fetchMediaInfo(id);

    // if (provider) {
    //   const data = await moviesHdWatchProvider.fetchMediaInfo(id);
    //   return data;
    // }

    const data = await metaTmbdProvider.fetchMediaInfo(id, type);

    return data;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}

export async function getEpisodeSources(mediaId: string, episodeId: string) {
  try {
    const data = await metaTmbdProvider.fetchEpisodeServers(episodeId, mediaId);

    return data;
  } catch (e: any) {
    console.log("error", e);
  }
}
