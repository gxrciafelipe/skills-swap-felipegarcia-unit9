import { useState } from "react";
import FilterBar from "./FilterBar.jsx";
import SkillCard from "./SkillCard.jsx";
import { filterSkillsByCategory } from "../../skillswap-functions.js";

function SkillsSection({ skills, loading, error, onRetry }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories come from the database now, so new categories appear automatically
  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];
  const visibleSkills = filterSkillsByCategory(skills, selectedCategory);

  return (
    <section id="skills" className="skills">
      <h2>Popular Skills</h2>

      {loading && <p className="status-message">Loading skills...</p>}

      {error && (
        <div className="tool-error">
          <p>{error}</p>
          <button type="button" className="tool-button" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <FilterBar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <div className="skills-grid">
            {visibleSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          {visibleSkills.length === 0 && <p>No skills in this category yet.</p>}
        </>
      )}
    </section>
  );
}

export default SkillsSection;
