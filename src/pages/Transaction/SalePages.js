import { Button } from 'react-bootstrap';
import {getTransaction} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import SalesTable from './components/SalesTable';
import TransactionDetail from "./components/TransactionDetail";
import DatePicker from "react-datepicker";

const PurchasePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedRow, setSelectedRow] = useState(null);
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchTransaction',startDate,endDate,currentPage],
        queryFn : ()=>{
            return getTransaction({'page':currentPage,'transaction_type':2,'from_date':startDate,'to_date':endDate}).then((response) => {
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

    return (
        <div className='container mt-2'>
            <div className='d-flex justify-content-lg-between mt-4'>
                <div className='d-flex column-gap-4'>
                    <h4>Sales Table</h4>
                    <div>
                        <span className="px-2">From Date:</span>
                    {/*   TODO issue with date format as it change*/}
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                    </div>
                    <div>
                        <span className="px-2">To Date:</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                    </div>
                </div>
                <Button as={Link} to="/sales/form" className="bg-dark">Add Sales</Button>
            </div>
            <SalesTable
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