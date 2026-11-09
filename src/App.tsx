import { Spinner } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import TabBar from './components/TabBar'
import { useAppSelector } from './store'

const App = () => {
    const location = useLocation()
    const isFeed = location.pathname.startsWith('/drug_doses/feed')
    const loading = useAppSelector(
        (state) =>
            state.drugDoses.loading ||
            state.drugDoseFeed.loading ||
            state.drugDoseDraft.loading ||
            state.auth.loading,
    )

    return (
        <div className={isFeed ? 'app app-feed' : 'app'}>
            <Outlet />
            <TabBar />

            {loading && (
                <div className="app-overlay">
                    <Spinner animation="border" role="status" variant="primary" />
                </div>
            )}
        </div>
    )
}

export default App
