import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../context/OrderDetails'


export default function OrderSummary({setOrderPhase}) {
    const [orderDetails] = useOrderDetails();
    
   
    const scoopArray = Array.from(orderDetails.scoops.entries());
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));
    const toppingArray = Array.from(orderDetails.toppings.entries());
    const toppingList = toppingArray.map(([key, value]) =>(
        <li key={key}>
        {value} {key}
    </li>
    ) )

    const hasToppings = orderDetails.toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }
    //console.log(orderDetails)

    return (
    <div>
    <h1>Order Summary</h1>
    <h2>Scoops: {orderDetails.totals.scoops} </h2>
    <div>{scoopList}</div>
    {toppingsDisplay}
    <h2>Total: {orderDetails.totals.grandTotal}</h2>
    <SummaryForm setOrderPhase={setOrderPhase} />
    </div >
    )
}