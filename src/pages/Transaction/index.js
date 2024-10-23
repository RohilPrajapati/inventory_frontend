import LineChart from "../../components/LineChart";



const Transaction = () => {
    
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const datasets= [
            {
                label: 'Sales',
                data: [10,140,150,117,113,152,210],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Purchase',
                data: [100,150,160,110,130,122,160],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
        ];
    return (
        <>
            <div className="d-flex h-25 w-50 m-1">
                {/*Number of transaction wise */}
                <LineChart  chartTitle="Monthly Tranaction Count" label={labels} dataset={datasets} />

            </div>
        </>
    );
}

export default Transaction