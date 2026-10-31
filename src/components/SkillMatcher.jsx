import { useState } from "react";
import SkillCard from "./SkillCard.jsx";
import { matchSkillsToUser } from "../../skillswap-functions.js";

function SkillMatcher({ skills }) {
  const categories = [...new Set(skills.map((skill) => skill.category))];
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState("");

  const selectedCategory = category || categories[0] || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const budget = Number(maxPrice);

    if (maxPrice === "" || budget < 0) {
      setMatches(null);
      setError("Enter a maximum price of 0 or more.");
      return;
    }

    setError("");
    setMatches(matchSkillsToUser({ category: selectedCategory, maxPrice: budget }, skills));
  };

  return (
    <section className="tool-section" aria-labelledby="matcher-heading">
      <h2 id="matcher-heading">Find My Match</h2>
      <form className="tool-form" onSubmit={handleSubmit}>
        <label>
          Category
          <select value={selectedCategory} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Max price per hour ($)
          <input
            type="number"
            min="0"
            step="1"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>
        <button type="submit" className="tool-button">
          Find My Match
        </button>
      </form>

      {error && <p className="tool-error">{error}</p>}

      {matches !== null && matches.length === 0 && (
        <p className="tool-result">No matches found. Try a higher budget or another category.</p>
      )}

      {matches !== null && matches.length > 0 && (
        <div className="skills-grid match-results">
          {matches.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SkillMatcher;
