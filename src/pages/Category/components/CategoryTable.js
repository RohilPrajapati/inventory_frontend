import {Table} from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import {truncateText} from '../../../helpers/table_utils';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {deleteCategory} from "../api/call";
import {toast} from "react-toastify";
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import {useState} from "react";
import ReactPaginate from 'react-paginate';

const CategoryTable = ({data, error, isLoading, refetch, currentPage, handlePageChange}) => {
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
        deleteCategory(row_id).then((response) => {
            setId(null)
            setShowModal(false)
            refetch()
            toast.success("Category delete successfully")
        }).catch((error) => {
            toast.error(error.data.message)
        })
    }


    const handleCloseModal = () => {
        setId(null)
        setShowModal(false);
    };

    return (
        <>
            <Table bordered hover responsive className="mt-2">
                <thead className='table-dark'>
                <tr>
                    <th>S. N.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {isLoading && <tr>
                    <td colSpan="5" className="text-center">
                        <PulseLoader/>
                    </td>
                </tr>}
                {data?.data && !isLoading && data?.data.map((category, index) => (
                    <tr key={index} className="align-middle">
                        <td className="col-1">{index + ((currentPage - 1) * 10) + 1}</td>
                        <td className="col-2">{category.name}</td>
                        <td className="col-5">{truncateText(category?.description, 100)}</td>
                        <td className="col-2">{category.is_active}{category.is_active ? "Active" : "Inactive"}</td>
                        <td className="col-2 text-center">
                            <Button className="btn btn-primary mx-1" as={Link}
                                    to={`/category/form/${category.id}`}>Edit</Button>
                            <div className="btn btn-danger mx-1" onClick={() => handleDeleteClick(category.id)}>Delete
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
export default CategoryTable;