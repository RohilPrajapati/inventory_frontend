import { Button } from 'react-bootstrap';
import CategoryTable from "./components/CategoryTable";
import {getCategory} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const Category = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchCategory',currentPage],
        queryFn : ()=>{
        return getCategory({'page':currentPage}).then((response) => {
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
                <h4>Category Table</h4>
                <Button as={Link} to="/category/form" className="bg-dark">Add Category</Button>
            </div>
            <CategoryTable
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
export default Category