import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectBoardProvider } from './state/ProjectBoardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectBoardProvider>
      <App />
    </ProjectBoardProvider>
  </StrictMode>,
)
