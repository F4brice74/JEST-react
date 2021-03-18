import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('summaryForm checkbox test', ()=>{
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    const button = screen.getByRole('button', {name:/confirm order/i})
    
    //checkbox is unchecked & button is disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
    
    //on click checkbox
    fireEvent.click(checkbox)

    //checkbox is checked & button is enabled
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
    
    //onclick checkbox
    fireEvent.click(checkbox)

    //checkbox is unchecked & button is disabled
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();

    
      
})
