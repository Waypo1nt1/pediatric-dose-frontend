import axios from 'axios'
import { Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { applyToken, TOKEN_KEY } from '../api'
import { signOut } from '../slices/authSlice'
import { clearDraft } from '../slices/drugDoseDraftSlice'
import { getDrugDosesList, resetFilter } from '../slices/drugDosesSlice'
import { useAppDispatch, useAppSelector } from '../store'

const FeedIcon = () => (
    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M10 9.5l5 2.5-5 2.5z" />
    </svg>
)

const DraftIcon = () => (
    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M12 8.5v7M8.5 12h7" />
    </svg>
)

const TilesIcon = () => (
    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </svg>
)

const LoginIcon = () => (
    <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3.5h4a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-4" />
        <path d="M10 8.5L13.5 12 10 15.5M13 12H4" />
    </svg>
)

const TabBar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    const handleSignOut = async () => {
        const token = localStorage.getItem(TOKEN_KEY)

        try {
            await axios.post('/api/users/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch {
            localStorage.removeItem(TOKEN_KEY)
        }

        localStorage.removeItem(TOKEN_KEY)
        applyToken(null)

        dispatch(signOut())
        dispatch(clearDraft())
        dispatch(resetFilter())
        dispatch(getDrugDosesList())
        navigate('/drug_doses')
    }

    const tabClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'tab tab-active' : 'tab')

    return (
        <Nav as="nav" className="tabbar">
            <NavLink to="/drug_doses/feed" className={tabClass}>
                <FeedIcon />
                <span className="tab-label">Лента</span>
            </NavLink>

            {isAuthenticated ? (
                <NavLink to="/drug_doses/draft" className={tabClass}>
                    <DraftIcon />
                    <span className="tab-label">Добавление</span>
                </NavLink>
            ) : (
                <span className="tab tab-disabled" aria-disabled="true">
                    <DraftIcon />
                    <span className="tab-label">Добавление</span>
                </span>
            )}

            <NavLink to="/drug_doses" end className={tabClass}>
                <TilesIcon />
                <span className="tab-label">Плитка</span>
            </NavLink>

            {isAuthenticated ? (
                <button type="button" className="tab tab-button" onClick={handleSignOut}>
                    <LoginIcon />
                    <span className="tab-label">Выход</span>
                </button>
            ) : (
                <NavLink to="/users/login" className={tabClass}>
                    <LoginIcon />
                    <span className="tab-label">Вход</span>
                </NavLink>
            )}
        </Nav>
    )
}

export default TabBar
