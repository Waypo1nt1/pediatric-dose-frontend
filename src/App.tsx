import { Outlet, useLocation } from 'react-router-dom'
import TabBar from './components/TabBar'

const App = () => {
    const location = useLocation()
    const isFeed = location.pathname.startsWith('/drug_doses/feed')

    return (
        <div className={isFeed ? 'app app-feed' : 'app'}>
            <Outlet />
            <TabBar />
        </div>
    )
}

export default App
