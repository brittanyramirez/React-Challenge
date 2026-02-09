import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies, posterUrl } from "../api/tmdb.js";

import theaterBg from "../assets/cinema-bg.jpeg";


export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) return;

    let cancelled = false;

    (async () => {
      try {
        setStatus("loading");
        setError("");
        const data = await searchMovies(submitted);
        if (cancelled) return;
        setMovies(data.results || []);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e?.message || "Something went wrong");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [submitted]);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSubmitted(trimmed);
  };

  return (
    <div>
     
      <section className="hero">
  <div
    className="hero-bg"
    style={{ backgroundImage: `url(${theaterBg})` }}
  />


        <div className="hero-content">
          <h1 className="hero-title">Find Your Next Movie</h1>
          <p className="hero-subtitle">
            Search for any title and click a poster to view details — cast your
            spotlight on something new.
          </p>

<section style={{ marginTop: 22 }}>
  <h2 className="section-title">Try a quick search</h2>

  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
    {["Interstellar", "Barbie", "The Dark Knight", "Spirited Away", "Get Out", "Harry Potter"].map((q) => (
      <button
        key={q}
        type="button"
        className="btn"
        onClick={() => {
          setQuery(q);
          setSubmitted(q);
        }}
      >
        {q}
      </button>
    ))}
  </div>
</section>

<section style={{ marginTop: 26 }}>
  <h2 className="section-title">How it works</h2>

  <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>1) Search</div>
      <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
        Type a title and we fetch matching movies using an API.
      </div>
    </div>

    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>2) Browse</div>
      <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
        Posters show you what’s trending in your search results.
      </div>
    </div>

    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>3) Details</div>
      <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
        Click any movie to view the full overview, rating, and genres.
      </div>
    </div>
  </div>
</section>

<footer style={{ marginTop: 28, padding: "18px 0", opacity: 0.75 }}>
  <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 14 }}>
    Data provided by TMDB • Built with React Hooks + React Router
  </div>
</footer>

          <form onSubmit={onSubmit} className="search-row">
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a movie... (ex: Avatar)"
            />
            <button className="btn btn-accent" type="submit">
              Search
            </button>
          </form>

          {status === "error" ? <p style={{ color: "#ff6b6b" }}>{error}</p> : null}

          {status === "loading" ? (
            <p style={{ margin: 0, opacity: 0.85 }}>Loading…</p>
          ) : null}

          {status === "success" ? (
            <p style={{ margin: 0, opacity: 0.85 }}>
              Results for: <b>{submitted}</b>
            </p>
          ) : null}
        </div>
      </section>

      {/* RESULTS */}
      {status === "success" && (
        <>
          <h2 className="section-title">Browse Results</h2>

          <div className="grid">
            {movies.map((m) => (
              <Link key={m.id} to={`/movie/${m.id}`} className="card">
                <div className="poster">
                  {m.poster_path ? (
                    <img src={posterUrl(m.poster_path)} alt={m.title} />
                  ) : null}
                </div>

                <div className="card-body">
                    <div className="card-title">{m.title}</div>
                    <div className="card-meta">
                    {m.release_date ? m.release_date.slice(0, 4) : "—"} • ⭐{" "}
                    {typeof m.vote_average === "number" ? m.vote_average.toFixed(1) : "—"}
                        </div>

  {m.overview ? (
    <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.35, opacity: 0.86 }}>
      {m.overview.length > 90 ? m.overview.slice(0, 90) + "…" : m.overview}
    </div>
  ) : null}
</div>

              </Link>
            ))}
          </div>

          {movies.length === 0 && <p style={{ opacity: 0.85 }}>No results found.</p>}
        </>
      )}
    </div>
  );
}
