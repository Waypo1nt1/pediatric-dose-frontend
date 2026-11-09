import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import DrugDoseDraftPage from './pages/DrugDoseDraftPage'
import DrugDoseFeedPage from './pages/DrugDoseFeedPage'
import DrugDosesPage from './pages/DrugDosesPage'
import LoginPage from './pages/LoginPage'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Navigate to="/drug_doses" replace />} />
                        <Route path="drug_doses" element={<DrugDosesPage />} />
                        <Route path="drug_doses/feed" element={<DrugDoseFeedPage />} />
                        <Route path="drug_doses/feed/:drug_dose_id" element={<DrugDoseFeedPage />} />
                        <Route path="drug_doses/draft" element={<DrugDoseDraftPage />} />
                        <Route path="users/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/drug_doses" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
