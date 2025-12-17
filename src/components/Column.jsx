import { useState } from 'react'
import { useProjectManager } from '../hooks/useProjectManager'
import { Task } from './Task'

export function Column({ project, projects }) {
  const { addTask } = useProjectManager()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  return (
    <section className="column" aria-label={`${project.name} column`}>
      <header className="column__header">
        <div className="column__titleRow">
          <h2 className="column__title">{project.name}</h2>
          <span className="column__count">{project.tasks.length}</span>
        </div>

        <form
          className="column__form"
          onSubmit={(e) => {
            e.preventDefault()
            const result = addTask(project.id, title)
            if (!result.ok) {
              setError(result.error)
              return
            }
            setTitle('')
            setError('')
          }}
        >
          <input
            className="column__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task…"
            aria-label={`Add task to ${project.name}`}
          />
          <button className="column__addBtn" type="submit">
            Add
          </button>
        </form>
        {error ? <div className="column__error">{error}</div> : null}
      </header>

      <div className="column__tasks">
        {project.tasks.length === 0 ? (
          <div className="column__empty">No tasks yet.</div>
        ) : (
          project.tasks.map((task) => (
            <Task key={task.id} task={task} projectId={project.id} projects={projects} />
          ))
        )}
      </div>
    </section>
  )
}


