const base = import.meta.env.BASE_URL

function ParallaxBand({ image, title, text }) {
  const src = image.startsWith('http') ? image : `${base}img/${image}`

  return (
    <section
      className="band"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,18,0.7), rgba(10,10,18,0.85)), url(${src})`,
      }}
    >
      <div className="band-inner">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  )
}

export default ParallaxBand