import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'

function Admin() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [projects, setProjects] = useState([])

  const loadProjects = useCallback(async () => {
    const { data } = await supabase
      .from('projects')
      .select('id, title')
      .order('created_at', { ascending: false })
    setProjects(data || [])
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadProjects()
  }, [session, loadProjects])

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Correo o contraseña incorrectos')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (checking) return <p className="admin">Cargando...</p>

  if (!session) {
    return (
      <div className="admin">
        <h2>Acceso administrador</h2>
        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Entrar</button>
          {error && <p className="error">{error}</p>}
        </form>
        <a href="#/">← Volver al portafolio</a>
      </div>
    )
  }

  return (
    <div className="admin">
      <h2>Panel de administrador</h2>
      <p>Sesión iniciada como {session.user.email}</p>

      <h3>Nuevo proyecto</h3>
      <ProjectForm onCreated={loadProjects} />

      <h3>Mis proyectos</h3>
      <ProjectList projects={projects} onDeleted={loadProjects} />

      <button onClick={handleLogout} className="btn">Cerrar sesión</button>
      <p><a href="#/">← Volver al portafolio</a></p>
    </div>
  )
}

export default Admin