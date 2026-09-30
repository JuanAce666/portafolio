function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-tag">
          Programación · Ciberseguridad · Bases de datos
        </span>
        <h2>
          Hola, soy <span className="gradient">Juan</span>
        </h2>
        <p>
          Aquí encontrarás los proyectos, laboratorios y prácticas que he
          desarrollado mientras aprendo y construyo.
        </p>
        <div className="hero-actions">
          <a href="#proyectos" className="btn">Ver proyectos</a>
          <a href="#contacto" className="btn btn-ghost">Contacto</a>
        </div>
      </div>
    </section>
  )
}

export default Hero