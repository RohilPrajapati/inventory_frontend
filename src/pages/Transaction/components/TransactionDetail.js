import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TransactionDetail = ({title,onClose,data}) => {
    return (
        <div
            className="modal_view"
        >
            <div className="dialog rounded-4">
                <div className="w-100">
                    <div className="bg-white rounded-2 p-2 my-2">
                        <h3 className="text-center">{data.transaction_type.name} Bill</h3>
                        Bill no: {data.bill_no} <br/>
                    </div>
                    <table className="w-100 table">
                        <thead>
                        <tr>
                            <th className="col-1 text-center">S.N.</th>
                            <th className="col-4 text-center">Product Name</th>
                            <th className="col-2 text-center">Quantity</th>
                            <th className="col-2 text-center">Price</th>
                            <th className="col-3 text-center">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data?.transaction_items.map((item, index) => (

                            <tr key={index}>

                                <td>{index + 1}</td>
                                <td>{item?.product?.name}</td>
                                <td className="text-end">{item?.qty}</td>
                                <td className="text-end">{item?.price}</td>
                                <td className="text-end">{item?.price * item?.qty}</td>
                            </tr>

                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-end">Total Amount: Rs {data.total_amount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="bg-white rounded-2 p-2 my-2">
                        Notes: {data.notes}
                    </div>
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                </Modal.Footer>
            </div>
        </div>
    );
}
export default TransactionDetail;