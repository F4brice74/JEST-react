import { render, screen } from '../../../test-utils/testing-library-utils';
import ScoopOptions from '../ScoopOption'
import userEvent from '@testing-library/user-event'


test('redbox for invalid input',async ()=> {
    render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()}/>)
    //define input
    const vanillaInput = await screen.findByRole('spinbutton');
    
      //input 1.5
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1.5')
    //expect input to be red
    expect(vanillaInput).toHaveClass('is-invalid')

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1,5')
    //expect input to be red
    expect(vanillaInput).toHaveClass('is-invalid')

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '-1.5')
    //expect input to be red
    expect(vanillaInput).toHaveClass('is-invalid')
    
    //input to regex \D
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '-1')

    //expect input to be red
    expect(vanillaInput).toHaveClass('is-invalid')

    // input 11
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '11')
    //expect input to be red
    expect(vanillaInput).toHaveClass('is-invalid')   

})