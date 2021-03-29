import Options from './Options';
import { useOrderDetails} from '../../context/OrderDetails'
import Button from 'react-bootstrap/Button'


export default function OrderEntry({setOrderPhase}) {
    
    const [orderDetails] = useOrderDetails();
   
    return (
       
        <div>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand Total: {orderDetails.totals.grandTotal} </h2>
        
            <Button variant="primary" onClick={() => setOrderPhase('review')}>Order Sundae !</Button>
        </div>
    )
}