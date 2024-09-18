import { Button } from 'react-bootstrap';
import {getStock} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import StockTable from './components/StockTable';
import Form from "react-bootstrap/Form";

const Inventory = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [search,setSearch] = useState('')
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchTransaction',currentPage,search],
        queryFn : ()=>{
            return getStock({'page':currentPage,'search':search}).then((response) => {
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
                <h4>Stock Table</h4>
                {/*<Button as={Link} to="/purchase/form" className="bg-dark">Add Purchase</Button>*/}
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                </Form>
            </div>
            <StockTable
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
export default Inventory;