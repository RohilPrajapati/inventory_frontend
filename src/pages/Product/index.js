import { Button } from 'react-bootstrap';
import {getProduct} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import ProductTable from "./components/ProductTable";

const Product = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchProduct',currentPage],
        queryFn : ()=>{
            return getProduct({'page':currentPage}).then((response) => {
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
            <div className='d-flex justify-content-lg-between'>
                <h4>Product Table</h4>
                <Button as={Link} to="/product/form" className="bg-dark">Add Product</Button>
            </div>
            <ProductTable
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
export default Product