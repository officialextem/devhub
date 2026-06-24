export default function ProjectCard({ index = 0, project }) {
  return (
    <article className="project-card" style={{ "--card-index": index }}>
      <div className="card-topline">
        <span className="status-pill">{project.status}</span>
        <span className="category">{project.category}</span>
      </div>

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <div className="stack-list" aria-label={`Stack für ${project.name}`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="card-footer">
        <span>Update: {project.lastUpdate}</span>
        {project.links?.length > 0 && (
          <div className="card-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
