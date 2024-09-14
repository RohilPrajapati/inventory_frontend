import { Link } from 'react-router-dom';
const SideBar = () => {
    return (
        <div className="sidebar pt-2">
            <div className="text-center fw-bold fs-4 mb-3">Volico</div>
            <Link to="/purchase" className='text-decoration-none d-block p-2  text-center text-dark fs-6'>Purchase</Link>
            <Link to="/sales" className='text-decoration-none d-block p-2  text-center text-dark fs-6'>Sales</Link>
        </div>
    );
}
export default SideBar;