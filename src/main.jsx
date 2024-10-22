import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles'
import App from './App.jsx'
import './index.css'
import './app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <StyledEngineProvider injectFirst>
          <CssVarsProvider>
              <App />
          </CssVarsProvider>
      </StyledEngineProvider>
  </StrictMode>
);