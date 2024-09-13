import TopNav from '../components/TopNav'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <>
            <TopNav />
            <div className="container mt-2">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout
