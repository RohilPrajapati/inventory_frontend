import {Table} from 'react-bootstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import {useState} from "react";
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import InfoIcon from '@mui/icons-material/Info';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';

const StockTable = ({data, error, isLoading, refetch, currentPage, handlePageChange}) => {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null)
    // const handleEditClick = (row_id) => {
    //     navigate(`/category/${row_id}`)
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
                    <th>Product Name</th>
                    <th>Supplier Name</th>
                    <th>Purchase Date</th>
                    <th>Quantity</th>
                    <th>Minimum Stock Level</th>
                    <th>Purchase Price</th>
                    <th>Sales Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data && !isLoading && data?.data.map((stock, index) => (
                    <tr key={index} className={`align-middle ${stock?.quantity_in_stock < stock?.minimum_stock_level ? 'table-danger' : ''}`}
                    >
                        <td>{index + ((currentPage - 1) * 10) + 1}</td>
                        <td>{stock?.product?.name}({stock?.product?.color})</td>
                        <td>{stock?.supplier?.name}</td>
                        <td>{moment(stock?.transaction_date).format('MMMM DD, YYYY hh:mm:ss A')}</td>
                        <td className="text-end">{stock?.quantity_in_stock}</td>
                        <td className="text-end">{stock?.minimum_stock_level}</td>
                        <td className="text-end">{stock?.purchase_price}</td>
                        <td className="text-end">{stock?.sales_price}</td>
                        {/* <td>{product.is_active ? "Active" : "Inactive"}</td> */}
                        <td className="text-center">
                            {/* <Button className="btn btn-primary m-1 " as={Link}
                                    to={`/product/form/${product.id}`}>Edit</Button> */}
                            {/* <div className="btn btn-danger mx-1" onClick={() => handleDeleteClick(product.id)}>Delete
                            </div> */}
                            <InfoIcon/>
                            <LoopOutlinedIcon />
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
export default StockTable;