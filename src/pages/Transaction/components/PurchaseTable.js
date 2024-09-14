import {Table} from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {deleteProduct} from "../api/call";
import {toast} from "react-toastify";
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import {useState} from "react";
import ReactPaginate from 'react-paginate';
import moment from 'moment';

const PurchaseTable = ({data, error, isLoading, refetch, currentPage, handlePageChange}) => {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null)
    // const handleEditClick = (row_id) => {
    //     navigate(`/category/${row_id}`)
    // }

    const handleDeleteClick = (id) => {
        setId(id)
        setShowModal(true);
    };
    // const handleConfirmDelete = (row_id) => {
    //     deleteProduct(row_id).then((response) => {
    //         setId(null)
    //         setShowModal(false)
    //         refetch()
    //         toast.success("Supplier delete successfully")
    //     }).catch((error) => {
    //         toast.error(error.data.message)
    //     })
    // }


    const handleCloseModal = () => {
        setId(null)
        setShowModal(false);
    };
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
            {/* <ConfirmDeleteModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                id={id}
            /> */}
        </>
    );
}
export default PurchaseTable;