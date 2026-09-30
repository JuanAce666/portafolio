import { supabase } from '../supabaseClient'

function ProjectList({ projects, onDeleted }) {
  async function handleDelete(id, title) {
    if (!window.confirm(`¿Borrar "${title}"?`)) return

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) alert('Error: ' + error.message)
    else onDeleted()
  }

  return (
    <ul className="admin-list">
      {projects.map((p) => (
        <li key={p.id}>
          <span>{p.title}</span>
          <button onClick={() => handleDelete(p.id, p.title)}>Borrar</button>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList