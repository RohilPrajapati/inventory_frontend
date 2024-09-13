
const Card = ({name,count, color}) => {
    return (
        <div
            className="card"
            style={{
                backgroundColor: color,
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                color: '#fff',
                width: '250px',
                margin:' 5px 10px',
            }}
        >

            <p style={{fontSize: '36px', margin: '5px 0 0'}}>{count}</p>
            <p style={{margin: '0', fontSize: '16px'}}>{name}</p>
        </div>
    );
}
export default Card;