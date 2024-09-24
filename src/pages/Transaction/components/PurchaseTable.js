import {Table} from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import {useState} from "react";
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import InfoIcon from '@mui/icons-material/Info';
import PurchaseDetail from "./TransactionDetail";

const PurchaseTable = ({data, error, isLoading, refetch, currentPage, handlePageChange,handleRowClick}) => {


    // Handle row click to open modal


    // Handle modal close

    if(isLoading) {
        return <PulseLoader/>
    }
    return (
        <>
            <Table bordered hover responsive className="mt-2">
                <thead className='table-dark'>
                <tr>
                    <th>S. N.</th>
                    <th>Bill No.</th>
                    <th>Purchase Date</th>
                    <th>Remarks</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data && !isLoading && data?.data.map((purchase, index) => (
                    <tr key={index} className="align-middle">
                        <td>{index + ((currentPage - 1) * 10) + 1}</td>
                        <td>{purchase?.bill_no}</td>
                        <td>{moment(purchase?.transaction_date).format('MMMM DD, YYYY hh:mm:ss A')}</td>
                        <td>{purchase?.notes}</td>
                        <td>{purchase?.total_amount}</td>
                        {/* <td>{product.is_active ? "Active" : "Inactive"}</td> */}
                        <td className="text-center">
                            {/* <Button className="btn btn-primary m-1 " as={Link}
                                    to={`/product/form/${product.id}`}>Edit</Button> */}
                            {/* <div className="btn btn-danger mx-1" onClick={() => handleDeleteClick(product.id)}>Delete
                            </div> */}
                                <InfoIcon onClick={() => handleRowClick(purchase)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ReactPaginate
                pageCount={data?.meta?.last_page || 1}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />
            {/* Render modal and pass the selected row data */}

        </>
    );
}
export default PurchaseTable;