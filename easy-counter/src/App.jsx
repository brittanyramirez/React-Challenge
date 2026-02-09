import { useState } from "react";
import bgImage from "./assets/pink-checkered.jpeg";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Times New Roman", Times, serif',
        padding: "2rem",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "2.5rem",
          borderRadius: "20px",
          textAlign: "center",
          minWidth: "280px",
        }}
      >
        <h1 style={{ marginTop: 0, fontWeight: "600" }}>Brittany's Counter</h1>

        <h2
          style={{
            fontSize: "3rem",
            margin: "1rem 0 2rem",
            fontWeight: "500",
          }}
        >
          {count}
        </h2>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={decrement}
            style={buttonStyle}
          >
            Decrement
          </button>

          <button
            onClick={reset}
            style={buttonStyle}
          >
            Reset
          </button>

          <button
            onClick={increment}
            style={buttonStyle}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#ffffff",
  fontSize: "0.9rem",
  fontWeight: "600",
  cursor: "pointer",
};

export default App;
