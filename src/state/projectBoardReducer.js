export const PROJECT_BOARD_STORAGE_KEY = 'projectBoardState:v1'

export const initialProjectBoardState = {
  projects: [
    {
      id: 'p-backlog',
      name: 'Backlog',
      tasks: [
        {
          id: 't-ideas',
          title: 'Capture ideas and clarify scope',
          createdAt: '2025-12-17T00:00:00.000Z',
        },
      ],
    },
    {
      id: 'p-todo',
      name: 'Todo',
      tasks: [
        {
          id: 't-spec',
          title: 'Write acceptance criteria',
          createdAt: '2025-12-17T00:00:00.000Z',
        },
      ],
    },
    {
      id: 'p-in-dev',
      name: 'In Dev',
      tasks: [
        {
          id: 't-dev',
          title: 'Implement core flow',
          createdAt: '2025-12-17T00:00:00.000Z',
        },
      ],
    },
    {
      id: 'p-in-review',
      name: 'In Review',
      tasks: [
        {
          id: 't-review',
          title: 'PR review & feedback',
          createdAt: '2025-12-17T00:00:00.000Z',
        },
      ],
    },
    {
      id: 'p-done',
      name: 'Done',
      tasks: [
        {
          id: 't-release',
          title: 'Release notes & demo',
          createdAt: '2025-12-17T00:00:00.000Z',
        },
      ],
    },
  ],
}

export const ProjectBoardActionType = Object.freeze({
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
})

function assertUnreachable(action) {
  throw new Error(`Unhandled action type: ${action?.type}`)
}

export function projectBoardReducer(state, action) {
  switch (action.type) {
    case ProjectBoardActionType.ADD_TASK: {
      const { projectId, task } = action.payload
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== projectId) return project
          return { ...project, tasks: [task, ...project.tasks] }
        }),
      }
    }
    case ProjectBoardActionType.DELETE_TASK: {
      const { projectId, taskId } = action.payload
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== projectId) return project
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          }
        }),
      }
    }
    case ProjectBoardActionType.MOVE_TASK: {
      const { fromProjectId, toProjectId, taskId } = action.payload
      if (fromProjectId === toProjectId) return state

      const fromProject = state.projects.find((p) => p.id === fromProjectId)
      const taskToMove = fromProject?.tasks.find((t) => t.id === taskId)
      if (!taskToMove) return state

      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === fromProjectId) {
            return {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== taskId),
            }
          }
          if (project.id === toProjectId) {
            return { ...project, tasks: [taskToMove, ...project.tasks] }
          }
          return project
        }),
      }
    }
    default:
      return assertUnreachable(action)
  }
}


