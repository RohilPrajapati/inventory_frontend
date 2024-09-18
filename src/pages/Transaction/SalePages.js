import { Button } from 'react-bootstrap';
import {getTransaction} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import SalesTable from './components/SalesTable';

const PurchasePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchTransaction',currentPage],
        queryFn : ()=>{
            return getTransaction({'page':currentPage,'transaction_type':2}).then((response) => {
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });

    const handlePageChange = (selectedPage) => {
        console.log(selectedPage)
        setCurrentPage(selectedPage.selected+1);
    }

    return (
        <div className='container mt-2'>
            <div className='d-flex justify-content-lg-between mt-4'>
                <h4>Sales Table</h4>
                <Button as={Link} to="/sales/form" className="bg-dark">Add Sales</Button>
            </div>
            <SalesTable
                data ={data}
                error = {error}
                isLoading = {isLoading}
                refetch={refetch}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}
export default PurchasePage;