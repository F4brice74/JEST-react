import AlertBanner from '../common/AlertBanner';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../context/OrderDetails'



export default function OrderConfirmation({ setOrderPhase }) {
   
    const [, , resetOrder] = useOrderDetails()
 
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState();
    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`, {

            })
            .then((response) => setOrderNumber(response.data.orderNumber))
            .catch((error) => setError(true));
    }, []);

    if (error) {
        return <AlertBanner />;
    }
    function handleClick() {
        resetOrder()

        setOrderPhase("inProgress")
    }
    //console.log("orderNumber", orderNumber)


    return (
        orderNumber ?
            <>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber} </p>
                <p>as per our termes and conditions, nothing will happen now</p>
                <Button onClick={handleClick}>Create new order</Button>
            </>
            : <div>Loading</div>
    )


}