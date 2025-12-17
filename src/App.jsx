import './App.css'
import { useProjectManager } from './hooks/useProjectManager'
import { Column } from './components/Column'

function App() {
  const { projects } = useProjectManager()

  return (
    <div className="appShell">
      <header className="appHeader">
        <div className="appHeader__text">
          <h1 className="appHeader__title">Project Board</h1>
          <p className="appHeader__subtitle">
            Organize work across stages: Backlog, Todo, In Dev, In Review, Done.
          </p>
        </div>
      </header>

      <main className="board" aria-label="Project board">
        <div className="board__columns">
          {projects.map((project) => (
            <Column key={project.id} project={project} projects={projects} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
