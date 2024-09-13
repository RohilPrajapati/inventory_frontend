import { Button } from 'react-bootstrap';
import {getSupplier} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import SupplierTable from "./components/SupplierTable";

const Supplier = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchProduct',currentPage],
        queryFn : ()=>{
            return getSupplier({'page':currentPage}).then((response) => {
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
        <>
            <div className='d-flex justify-content-lg-between'>
                <h4>Supplier Table</h4>
                <Button as={Link} to="/supplier/form" className="bg-dark">Add Supplier</Button>
            </div>
            <SupplierTable
                data ={data}
                error = {error}
                isLoading = {isLoading}
                refetch={refetch}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
}
export default Supplier