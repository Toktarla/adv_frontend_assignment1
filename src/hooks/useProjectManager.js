import { useCallback, useContext } from 'react'
import { ProjectBoardContext } from '../state/ProjectBoardContext'
import { ProjectBoardActionType } from '../state/projectBoardReducer'

function createId(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function normalizeTitle(rawTitle) {
  return String(rawTitle ?? '').trim()
}

export function useProjectManager() {
  const ctx = useContext(ProjectBoardContext)
  if (!ctx) {
    throw new Error('useProjectManager must be used within a ProjectBoardProvider')
  }

  const { state, dispatch } = ctx

  const addTask = useCallback(
    (projectId, title) => {
      const normalizedTitle = normalizeTitle(title)
      if (!normalizedTitle) return { ok: false, error: 'Task title is required.' }

      dispatch({
        type: ProjectBoardActionType.ADD_TASK,
        payload: {
          projectId,
          task: {
            id: createId('t'),
            title: normalizedTitle,
            createdAt: new Date().toISOString(),
          },
        },
      })

      return { ok: true }
    },
    [dispatch],
  )

  const deleteTask = useCallback(
    (projectId, taskId) => {
      dispatch({
        type: ProjectBoardActionType.DELETE_TASK,
        payload: { projectId, taskId },
      })
    },
    [dispatch],
  )

  const moveTask = useCallback(
    (fromProjectId, toProjectId, taskId) => {
      dispatch({
        type: ProjectBoardActionType.MOVE_TASK,
        payload: { fromProjectId, toProjectId, taskId },
      })
    },
    [dispatch],
  )

  return {
    state,
    projects: state.projects,
    addTask,
    deleteTask,
    moveTask,
  }
}


