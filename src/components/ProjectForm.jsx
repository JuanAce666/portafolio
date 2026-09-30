import { useState } from 'react'
import { supabase } from '../supabaseClient'

function ProjectForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('programacion')
  const [tech, setTech] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    let fileUrl = null

 
    if (file) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `${Date.now()}_${safeName}`

      const { error: uploadError } = await supabase.storage
        .from('archivos')
        .upload(path, file)

      if (uploadError) {
        setMessage('Error al subir el archivo: ' + uploadError.message)
        setSaving(false)
        return
      }

      const { data } = supabase.storage.from('archivos').getPublicUrl(path)
      fileUrl = data.publicUrl
    }

   
    const { error } = await supabase.from('projects').insert({
      title,
      description,
      category,
      tech: tech.split(',').map((t) => t.trim()).filter(Boolean),
      repo_url: repoUrl || null,
      file_url: fileUrl,
    })

    if (error) {
      setMessage('Error al guardar: ' + error.message)
    } else {
      setMessage('Proyecto guardado ✔')
      setTitle('')
      setDescription('')
      setTech('')
      setRepoUrl('')
      setFile(null)
      e.target.reset()
      onCreated()
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="programacion">Programación</option>
        <option value="ciberseguridad">Ciberseguridad</option>
        <option value="bases_de_datos">Bases de datos</option>
      </select>
      <input
        placeholder="Tecnologías separadas por coma: Python, SQL"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />
      <input
        type="url"
        placeholder="Link del repositorio (opcional)"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="btn" disabled={saving}>
        {saving ? 'Guardando...' : 'Guardar proyecto'}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default ProjectForm