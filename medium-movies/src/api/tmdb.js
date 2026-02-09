const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

function requireKey() {
  if (!API_KEY) throw new Error("Missing VITE_TMDB_API_KEY in medium-movies/.env");
}

export async function searchMovies(query) {
  requireKey();
  const url = new URL(`${BASE}/search/movie`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("query", query);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
}

export async function getMovieDetails(id) {
  requireKey();
  const url = new URL(`${BASE}/movie/${id}`);
  url.searchParams.set("api_key", API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export function posterUrl(path, size = "w342") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}
