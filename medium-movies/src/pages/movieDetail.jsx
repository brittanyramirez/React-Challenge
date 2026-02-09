import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, posterUrl } from "../api/tmdb.js";

export default function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setError("No movie id found in the URL.");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setStatus("loading");
        setError("");
        const data = await getMovieDetails(id);
        if (cancelled) return;
        setMovie(data);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e?.message || "Failed to load movie details");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div>
        <Link to="/" className="btn">← Back</Link>
        <p style={{ opacity: 0.85, marginTop: 14 }}>Loading details…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <Link to="/" className="btn">← Back</Link>
        <p style={{ color: "#ff6b6b", marginTop: 14 }}>{error}</p>
        <p style={{ opacity: 0.75 }}>Movie id: <b>{id}</b></p>
      </div>
    );
  }

  if (!movie) return <p style={{ opacity: 0.85 }}>Movie not found.</p>;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "—";

  return (
    <div>
      <Link to="/" className="btn">← Back to search</Link>

      <section className="hero" style={{ minHeight: "unset", marginTop: 14 }}>
        <div className="hero-content" style={{ maxWidth: "unset" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 18 }}>
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {movie.poster_path ? (
                <img
                  src={posterUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{ height: 360, display: "grid", placeItems: "center", opacity: 0.75 }}>
                  No Poster
                </div>
              )}
            </div>

            <div>
              <h1 className="hero-title" style={{ fontSize: 36, margin: 0 }}>
                {movie.title}
              </h1>

              <p style={{ marginTop: 8, color: "rgba(255,255,255,0.75)" }}>
                {year} • ⭐ {rating}
              </p>

              <p style={{ lineHeight: 1.7, marginTop: 14, color: "rgba(255,255,255,0.86)" }}>
                {movie.overview || "No overview available."}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                {(movie.genres || []).map((g) => (
                  <span
                    key={g.id}
                    style={{
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.06)",
                      padding: "6px 10px",
                      borderRadius: 999,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <Link to="/" className="btn">New Search</Link>
                <a
                  className="btn btn-accent"
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on TMDB
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
