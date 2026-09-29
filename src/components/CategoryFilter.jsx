const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'programacion', label: 'Programación' },
  { value: 'ciberseguridad', label: 'Ciberseguridad' },
  { value: 'bases_de_datos', label: 'Bases de datos' },
]

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="filter">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={selected === cat.value ? 'active' : ''}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
