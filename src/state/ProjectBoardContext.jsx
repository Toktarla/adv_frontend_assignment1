import { createContext, useEffect, useMemo, useReducer } from 'react'
import {
  initialProjectBoardState,
  projectBoardReducer,
  PROJECT_BOARD_STORAGE_KEY,
} from './projectBoardReducer'

export const ProjectBoardContext = createContext(null)

function hydrateInitialState() {
  if (typeof window === 'undefined') return initialProjectBoardState

  try {
    const raw = window.localStorage.getItem(PROJECT_BOARD_STORAGE_KEY)
    if (!raw) return initialProjectBoardState
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return initialProjectBoardState
    if (!Array.isArray(parsed.projects)) return initialProjectBoardState
    return parsed
  } catch {
    return initialProjectBoardState
  }
}

export function ProjectBoardProvider({ children }) {
  const [state, dispatch] = useReducer(
    projectBoardReducer,
    undefined,
    hydrateInitialState,
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(PROJECT_BOARD_STORAGE_KEY, JSON.stringify(state))
    } catch {
      // If storage is unavailable or quota is exceeded, the app should still function.
    }
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <ProjectBoardContext.Provider value={value}>
      {children}
    </ProjectBoardContext.Provider>
  )
}


