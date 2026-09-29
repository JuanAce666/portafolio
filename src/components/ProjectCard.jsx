function ProjectCard({ project }) {
  return (
    <article className="card">
      <span className="badge">{project.category}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <ul className="tech-list">
        {project.tech?.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card-links">
        {project.repo_url && (
          <a href={project.repo_url} target="_blank" rel="noreferrer">
            Repositorio
          </a>
        )}
        {project.file_url && (
          <a href={project.file_url} target="_blank" rel="noreferrer">
            Descargar archivo
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
