import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

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

const TabBar = () => (
    <Nav as="nav" className="tabbar">
        <NavLink to="/drug_doses/feed" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>
            <FeedIcon />
            <span className="tab-label">Лента</span>
        </NavLink>

        <span className="tab tab-disabled" aria-disabled="true">
            <DraftIcon />
            <span className="tab-label">Добавление</span>
        </span>

        <NavLink to="/drug_doses" end className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>
            <TilesIcon />
            <span className="tab-label">Плитка</span>
        </NavLink>

        <span className="tab tab-disabled" aria-disabled="true">
            <LoginIcon />
            <span className="tab-label">Вход</span>
        </span>
    </Nav>
)

export default TabBar
