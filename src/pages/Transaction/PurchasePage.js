import { Button } from 'react-bootstrap';
import {getTransaction} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import PurchaseTable from './components/PurchaseTable';
import TransactionDetail from "./components/TransactionDetail";

const PurchasePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchTransaction',currentPage],
        queryFn : ()=>{
            return getTransaction({'page':currentPage,'transaction_type':1}).then((response) => {
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });
    const handleRowClick = (rowData) => {
        console.log("issue on")
        console.log(rowData)
        setSelectedRow(rowData);
        setShowModal(true); // Show modal
    };
    const handleCloseModal = () => {
        setSelectedRow(null)
        setShowModal(false);
    };

    const handlePageChange = (selectedPage) => {
        console.log(selectedPage)
        setCurrentPage(selectedPage.selected+1);
    }
    console.log(showModal)
    return (
        <div className='container mt-2'>
            <div className='d-flex justify-content-lg-between mt-4'>
                <h4>Purchase Table</h4>
                <Button as={Link} to="/purchase/form" className="bg-dark">Add Purchase</Button>
            </div>
            <PurchaseTable
                data ={data}
                error = {error}
                isLoading = {isLoading}
                refetch={refetch}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                handleRowClick={handleRowClick}
            />
            {showModal && (
                <TransactionDetail
                    show={showModal}
                    onClose={handleCloseModal}
                    data={selectedRow}
                />
            )}
        </div>
    );
}
export default PurchasePage;