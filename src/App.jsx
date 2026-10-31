import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import AddSkillForm from "./components/AddSkillForm.jsx";
import CostCalculator from "./components/CostCalculator.jsx";
import SkillMatcher from "./components/SkillMatcher.jsx";
import Footer from "./components/Footer.jsx";
import { fetchSkills } from "./api-service.js";

function App() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Loads skills from the backend. Called on page load and after a skill is created.
  const loadSkills = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSkills();
      // Some APIs return an array, others wrap it, e.g. { skills: [...] }
      const list = Array.isArray(data) ? data : data.skills || data.data || [];
      // Make sure price is a number so filtering and matching work correctly
      setSkills(list.map((skill) => ({ ...skill, price: Number(skill.price) })));
    } catch (err) {
      setError("Could not load skills. Is the backend running on port 3000?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SkillsSection skills={skills} loading={loading} error={error} onRetry={loadSkills} />
        <AddSkillForm onCreated={loadSkills} />
        <CostCalculator />
        <SkillMatcher skills={skills} />
      </main>
      <Footer />
    </>
  );
}

export default App;
