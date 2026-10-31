import { useState } from "react";
import { createSkill } from "../api-service.js";

const EMPTY_FORM = { title: "", category: "", price: "", description: "" };

function AddSkillForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await createSkill({
        title: form.title.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        description: form.description.trim(),
      });
      setForm(EMPTY_FORM);
      setMessage({ type: "success", text: "Skill added!" });
      await onCreated(); // reload the list so the new skill shows up
    } catch (err) {
      setMessage({ type: "error", text: "Could not add the skill. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="tool-section" aria-labelledby="add-skill-heading">
      <h2 id="add-skill-heading">Offer a Skill</h2>
      <form className="tool-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
        <label>
          Price per hour ($)
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <input name="description" value={form.description} onChange={handleChange} required />
        </label>
        <button type="submit" className="tool-button" disabled={submitting}>
          {submitting ? "Adding..." : "Add Skill"}
        </button>
      </form>

      {message.type === "success" && <p className="tool-result">{message.text}</p>}
      {message.type === "error" && <p className="tool-error">{message.text}</p>}
    </section>
  );
}

export default AddSkillForm;
