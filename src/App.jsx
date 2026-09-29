import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import CategoryFilter from './components/CategoryFilter'
import ProjectCard from './components/ProjectCard'

function App() {
  const [category, setCategory] = useState ('todos')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProjects() {
      const { data, error} = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

      if (error) setError(error.message) 
        else setProjects(data)
      setLoading(false)
    }
  
    loadProjects()
  },[])
  
  const visibleProjects = 
    category === 'todos'
    ? projects
    : projects.filter((p) => p.category === category )

      return (
    <>
      <Navbar />
      <main id="proyectos">
        <CategoryFilter selected={category} onChange={setCategory} />

        {loading && <p>Cargando proyectos...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && visibleProjects.length === 0 && (
          <p>No hay proyectos en esta categoría.</p>
        )}

        <section className="grid">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>
      </main>
    </>
  )
}

export default App