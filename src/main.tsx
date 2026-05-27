import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import HomescreenWeb from './HomescreenWeb.tsx'
import HomescreenWebUnified from './HomescreenWebUnified.tsx'

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/separated" replace />} />
      <Route path="/separated" element={<HomescreenWeb />} />
      <Route path="/unified" element={<HomescreenWebUnified />} />
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
