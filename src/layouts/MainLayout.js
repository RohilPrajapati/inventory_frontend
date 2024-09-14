import TopNav from '../components/TopNav'
import { Outlet } from 'react-router-dom'
import SideBar from "../components/SideBar";
const MainLayout = () => {
    return (
        <>

            <div className="">
                <SideBar />
                <div className="main_body">
                    <TopNav />
                    <Outlet className="ms-5" />
                </div>
            </div>
        </>
    )
}

export default MainLayout
