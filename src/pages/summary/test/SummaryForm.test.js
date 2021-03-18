import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event'


test('summaryForm checkbox test', ()=>{
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    const button = screen.getByRole('button', {name:/confirm order/i})
    
    //checkbox is unchecked & button is disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
    
    //on click checkbox
    userEvent.click(checkbox)

    //checkbox is checked & button is enabled
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
    
    //onclick checkbox
    userEvent.click(checkbox)

    //checkbox is unchecked & button is disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
      
})

test('popover responds to hover', async ()=>{
    render(<SummaryForm />)   
//popover is hidden first
const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
expect(nullPopover).not.toBeInTheDocument();

//popover appears upon mouseover of checkbox label
const termsAndConditions = screen.getByText(/terms and conditions/i);
userEvent.hover(termsAndConditions);
const popover = screen.getByText(/no ice cream will actually be delivered/i);
expect(popover).toBeInTheDocument();
//popover disappears when we mouse out

userEvent.unhover(termsAndConditions);
await waitForElementToBeRemoved(()=> screen.queryByText(/no ice cream will actually be delivered/i) ) 
})
