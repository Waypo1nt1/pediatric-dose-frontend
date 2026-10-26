import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import DrugDoseFeedPage from './pages/DrugDoseFeedPage'
import DrugDosesPage from './pages/DrugDosesPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="/drug_doses" replace />} />
                    <Route path="drug_doses" element={<DrugDosesPage />} />
                    <Route path="drug_doses/feed" element={<DrugDoseFeedPage />} />
                    <Route path="drug_doses/feed/:drug_dose_id" element={<DrugDoseFeedPage />} />
                    <Route path="*" element={<Navigate to="/drug_doses" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
