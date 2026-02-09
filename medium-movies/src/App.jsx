import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/searchPage.jsx";
import MovieDetailPage from "./pages/movieDetail.jsx";

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </div>
  );
}
