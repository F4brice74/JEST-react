import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phases for happy path', async()=>{
    // render APP
    render(<App />)
    // add ice cream scoops and toppings
    const scoops = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    userEvent.clear(scoops)
    userEvent.type(scoops, '2')
    //define scoop subtotal
    const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopSubtotal).toHaveTextContent('4.00')

    const toppings = await screen.findByRole('checkbox', {name : 'Cherries'})
    userEvent.click(toppings)
    const toppingSubtotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingSubtotal).toHaveTextContent('1.50')
    
    //define grand total
    const grandtotal = screen.getByRole('heading', {name: /grand total: \$/i})
    expect(grandtotal).toHaveTextContent('5.50')
    
    // find and click order button
    const orderButton = screen.getByRole('button', {name: "Order Sundae !"})
    userEvent.click(orderButton)

    // check summary information based on order
       const optionsItem = screen.getAllByRole('listitem')
    const optionItemText = optionsItem.map((item)=> item.textContent)
    expect(optionItemText).toEqual(['2 Vanilla', '1 Cherries'])
 
    // accept termes and conditions and click button to confirm order
    const summaryCheckbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    expect(summaryCheckbox).toBeInTheDocument();
    userEvent.click(summaryCheckbox)
    const confirmOrderButton = screen.getByRole('button', {name: /confirm order/i})
    userEvent.click(confirmOrderButton)

    // expect loading
    const loading = screen.getByText("Loading")
    expect(loading).toBeInTheDocument();

    // confirm order number on confirmation page
    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument();

    //loading disappear as soon as the response request
    const notloading = screen.queryByText("Loading")
    expect(notloading).not.toBeInTheDocument();
   
    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    userEvent.click(newOrderButton);
    
    // check that scoops and toppings subtotal have been reset
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Scoops total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();
    
    // do we need to await anything to avoid test error
   
    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'Cherries' });

})

test('optionnal toppings', async()=>{
    // render App
    render(<App />)

    // Add scoops and no toppings
    const scoops = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    userEvent.clear(scoops);
    userEvent.type(scoops, '1'); 
    const toppingsTotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingsTotal).toHaveTextContent('0.00')
    // order sundae
    const orderButton = screen.getByRole('button', {name: "Order Sundae !"})
    userEvent.click(orderButton)
    //toppings heading not there

    const headingToppings = screen.queryByRole('headings', {name : "Toppings: $"})
    expect(headingToppings).not.toBeInTheDocument();

})