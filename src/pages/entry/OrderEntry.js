import Options from './Options';
import { useOrderDetails} from '../../context/OrderDetails'
import Button from 'react-bootstrap/Button'
import { useState, useEffect} from 'react';


export default function OrderEntry({setOrderPhase}) {
    
    const [orderDetails] = useOrderDetails();
  
    let buttonEnable = orderDetails.totals.scoops === '$0.00'
    
   //console.log(orderDetails.totals.scoops)
    return (
       
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand Total: {orderDetails.totals.grandTotal} </h2>
        
            <Button disabled={buttonEnable} variant="primary" onClick={() => setOrderPhase('review')}>Order Sundae !</Button>
        </div>
    )
}