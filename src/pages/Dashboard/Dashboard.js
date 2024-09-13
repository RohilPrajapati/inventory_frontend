import Card from './components/Card'
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {getDashboard} from "./api/call";

const Dashboard = () => {

    const { data, error, isLoading,refetch } = useQuery({
        queryKey: ['fetchDashboard'],
        queryFn : ()=>{
            return getDashboard().then((response) => {
                return response.data
            }).catch((error) => {
                toast.error('Fail to Fetch data');
                return error.data;
            })
        },
    });
    console.log(data);
    if(isLoading){
        return "Loading"
    }
    if(error){
        return "Error"
    }
    return (
        <>
            <h1 className="fw-bold">Dashboard</h1>
            <div className="d-flex justify-content-start flex-wrap">
                <Card name="Product Count" color="#097969" count={data['product_count']}/>
                <Card name="Category Count" color="#D24D57" count={data['category_count']}/>
                <Card name="Supplier Count" color="#1F4788" count={data['supplier_count']}/>
                <Card name="Sales Quantity" color="#6C7A89" count="300"/>
                <Card name="Purchase Quantity" color="#5B3256" count="400"/>
                <Card name="Sales Amount" color="#757D75" count="Rs. 30000"/>
                <Card name="Purchase Amount" color="#763568" count="Rs. 45000"/>
            </div>
        </>
    )
}
export default Dashboard;