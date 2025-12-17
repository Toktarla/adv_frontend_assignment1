import { useProjectManager } from '../hooks/useProjectManager'

export function Task({ task, projectId, projects }) {
  const { deleteTask, moveTask } = useProjectManager()

  const currentIndex = projects.findIndex((p) => p.id === projectId)
  const canMoveLeft = currentIndex > 0
  const canMoveRight = currentIndex < projects.length - 1
  const leftTargetId = canMoveLeft ? projects[currentIndex - 1].id : null
  const rightTargetId = canMoveRight ? projects[currentIndex + 1].id : null

  return (
    <div className="task">
      <div className="task__main">
        <div className="task__title" title={task.title}>
          {task.title}
        </div>
        <div className="task__meta">Created {new Date(task.createdAt).toLocaleString()}</div>
      </div>

      <div className="task__actions">
        <div className="task__moveGroup">
          <button
            type="button"
            className="task__moveBtn"
            disabled={!canMoveLeft}
            onClick={() => leftTargetId && moveTask(projectId, leftTargetId, task.id)}
          >
            ← Move left
          </button>
          <button
            type="button"
            className="task__moveBtn"
            disabled={!canMoveRight}
            onClick={() => rightTargetId && moveTask(projectId, rightTargetId, task.id)}
          >
            Move right →
          </button>
        </div>

        <button
          type="button"
          className="task__delete"
          onClick={() => deleteTask(projectId, task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}


