import { Button } from 'react-bootstrap';
import {getTransaction} from "./api/call";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import PurchaseTable from './components/PurchaseTable';
import TransactionDetail from "./components/TransactionDetail";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";

const PurchasePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchTransaction',currentPage,startDate,endDate],
        queryFn : ()=>{
            return getTransaction({'from_date':startDate,'to_date':endDate,'page':currentPage,'transaction_type':1}).then((response) => {
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
    const handleDateChange = (type,date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
        const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
        const formattedDate =  `${year}-${month}-${day}`;
        if (type === 'endDate'){
            setEndDate(formattedDate)
        }
        else if (type === 'startDate'){
            setStartDate(formattedDate)
        }

    }

    function flattenData(nestedData) {
        return nestedData.map((transaction) => {
            return transaction.transaction_items.map((item) => {
                return {
                    transaction_id: transaction.id,
                    transaction_uuid: transaction.transaction_uuid,
                    order_no: transaction.order_no,
                    bill_no: transaction.bill_no,
                    transaction_date: transaction.transaction_date,
                    total_amount: transaction.total_amount,
                    transaction_type: transaction.transaction_type.name,
                    product_id: item.product.id,
                    product_name: item.product.name,
                    product_sku: item.product.sku,
                    product_upc: item.product.upc,
                    product_color: item.product.color,
                    product_size: item.product.size,
                    product_weight: item.product.weight,
                    product_category: item.product.category,
                    qty: item.qty,
                    price: item.price,
                    stock_id: item.stock.id,
                    stock_quantity_in_stock: item.stock.quantity_in_stock,
                    stock_minimum_stock_level: item.stock.minimum_stock_level,
                    stock_maximum_stock_level: item.stock.maximum_stock_level,
                    stock_purchase_price: item.stock.purchase_price,
                    stock_sales_price: item.stock.sales_price,
                    transaction_notes: transaction.notes
                };
            });
        }).flat(); // Flatten the resulting arrays of arrays
    }
    console.log(data?.data)
    const handleExport = () => {
        let flatData = flattenData(data?.data)
        // Convert JSON data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(flatData);

        // Create a new workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Export the workbook to an Excel file
        XLSX.writeFile(workbook, "data.xlsx");
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
            <div className="d-flex column-gap-4 mt-2">
                <span className="px-2">From Date:</span>
                {/*   TODO issue with date format as it change*/}
                <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    dateFormat='yyyy-MM-dd'
                />

                <span className="px-2">To Date:</span>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    dateFormat='yyyy-MM-dd'
                />
                <Button onClick={handleExport}>Export</Button>
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