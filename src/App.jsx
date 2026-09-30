import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contact from './components/Contact'
import CategoryFilter from './components/CategoryFilter'
import ProjectCard from './components/ProjectCard'
import Admin from './pages/Admin'

function App() {
  const [category, setCategory] = useState('todos')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [route, setRoute] = useState(window.location.hash)

  
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

 
  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) setError(error.message)
      else setProjects(data)
      setLoading(false)
    }

    loadProjects()
  }, [])

  const visibleProjects =
    category === 'todos'
      ? projects
      : projects.filter((p) => p.category === category)

  if (route === '#/admin') return <Admin />

  return (
    <>
      <Navbar />
      <Hero />
      <main id="proyectos">
        <h2>Proyectos</h2>
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
      <Contact />
    </>
  )
}

export default App