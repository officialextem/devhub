import { useMemo, useState } from "react";
import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard.jsx";

const allFilter = "Alle";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(allFilter);
  const [activeStatus, setActiveStatus] = useState(allFilter);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = useMemo(
    () => [allFilter, ...new Set(projects.map((project) => project.category))],
    [],
  );
  const statuses = useMemo(
    () => [allFilter, ...new Set(projects.map((project) => project.status))],
    [],
  );

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === allFilter || project.category === activeCategory;
      const matchesStatus = activeStatus === allFilter || project.status === activeStatus;
      const searchableText = [
        project.name,
        project.status,
        project.category,
        project.description,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        matchesStatus &&
        (!normalizedSearch || searchableText.includes(normalizedSearch))
      );
    });
  }, [activeCategory, activeStatus, searchTerm]);

  return (
    <section id="projects" className="section-band">
      <div className="content-wrap">
        <div className="section-heading">
          <p className="eyebrow">Projekte</p>
          <h2>Aktuelle Builds und Experimente</h2>
          <p>
            Die Projektliste wird aus JSON geladen und ist so vorbereitet, dass sie
            später automatisiert durch einen Website-Announcer-Bot aktualisiert werden kann.
          </p>
        </div>

        <div className="project-filter-shell">
          <button
            aria-controls="project-filter-panel"
            aria-expanded={isSearchOpen}
            className="project-filter-toggle"
            type="button"
            onClick={() => setIsSearchOpen((current) => !current)}
          >
            {isSearchOpen ? "Projektsuche schließen" : "Projektsuche öffnen"}
          </button>

          <div
            aria-label="Projektfilter"
            className={`project-filter-panel${isSearchOpen ? " is-open" : ""}`}
            hidden={!isSearchOpen}
            id="project-filter-panel"
          >
            <label className="search-field">
              <span>Suche</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Projekt, Stack oder Kategorie"
              />
            </label>

            <div className="filter-group" aria-label="Kategorien">
              <span>Kategorie</span>
              <div className="filter-buttons">
                {categories.map((category) => (
                  <button
                    className={category === activeCategory ? "is-active" : ""}
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group" aria-label="Status">
              <span>Status</span>
              <div className="filter-buttons">
                {statuses.map((status) => (
                  <button
                    className={status === activeStatus ? "is-active" : ""}
                    key={status}
                    type="button"
                    onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <p className="filter-result">
              {filteredProjects.length} von {projects.length} Projekten sichtbar
            </p>
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
