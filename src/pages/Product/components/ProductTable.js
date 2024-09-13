import {Table} from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {deleteProduct} from "../api/call";
import {toast} from "react-toastify";
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import {useState} from "react";
import ReactPaginate from 'react-paginate';

const ProductTable = ({data, error, isLoading, refetch, currentPage, handlePageChange}) => {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null)
    // const handleEditClick = (row_id) => {
    //     navigate(`/category/${row_id}`)
    // }

    const handleDeleteClick = (id) => {
        setId(id)
        setShowModal(true);
    };
    const handleConfirmDelete = (row_id) => {
        deleteProduct(row_id).then((response) => {
            setId(null)
            setShowModal(false)
            refetch()
            toast.success("Supplier delete successfully")
        }).catch((error) => {
            toast.error(error.data.message)
        })
    }


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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>SKU</th>
                    <th>UPC</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Weight</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data && !isLoading && data?.data.map((product, index) => (
                    <tr key={index} className="align-middle">
                        <td>{index + ((currentPage - 1) * 10) + 1}</td>
                        <td><img className='tableImg' src={'http://localhost:8000'+product.image} alt={product.name} /> </td>
                        <td>{product?.name}</td>
                        <td>{product?.description}</td>
                        <td>{product?.category_data?.name}</td>
                        <td>{product?.sku}</td>
                        <td>{product?.upc}</td>
                        <td>{product?.color}</td>
                        <td>{product?.size}</td>
                        <td>{product?.weight}</td>
                        <td>{product.is_active ? "Active" : "Inactive"}</td>
                        <td className="text-center">
                            <Button className="btn btn-primary m-1 " as={Link}
                                    to={`/product/form/${product.id}`}>Edit</Button>
                            <div className="btn btn-danger mx-1" onClick={() => handleDeleteClick(product.id)}>Delete
                            </div>
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
            <ConfirmDeleteModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                id={id}
            />
        </>
    );
}
export default ProductTable;