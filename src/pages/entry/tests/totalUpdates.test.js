import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'


test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure total start out $0.00
    const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopSubtotal).toHaveTextContent('0.00')

    //update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1')
    expect(scoopSubtotal).toHaveTextContent('2.00');

    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    // always clear input before test
    userEvent.clear(chocolateInput);
    // increase value with type
    userEvent.type(chocolateInput, '2');
    // check if subtotal increase by 4$
    expect(scoopSubtotal).toHaveTextContent('6.00')
})

// test for toppings

test('update toppings total when toppings change', async () => {
    render(<Options optionType="toppings" />);

    // make sure total start out $0.00
    const toppingSubtotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingSubtotal).toHaveTextContent('0.00')

    // checkbox options
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" })
    const mandmsCheckbox = await screen.findByRole('checkbox', { name: "M&Ms" })

    //check Cherries checkbox
    userEvent.click(cherriesCheckbox);
    //cherries checkbox should be checked
    expect(cherriesCheckbox).toBeChecked();
    //and check subtotal (+1.50)
    expect(toppingSubtotal).toHaveTextContent('1.50');

    // check 2nd one
    userEvent.click(mandmsCheckbox);
    expect(mandmsCheckbox).toBeChecked();
    expect(toppingSubtotal).toHaveTextContent('3.00');

    // uncheck cherries box
    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).not.toBeChecked();
    expect(toppingSubtotal).toHaveTextContent('1.50');

})

describe('grand total', () => {
    
   test('grand total updates properly if scoops added first', async () => {
        render(<OrderEntry  />);
        //define grandtotal
        const grandtotal = await screen.findByRole('heading', { name: /grand total: \$/i });
        //grandtotal start at 0.00
        expect(grandtotal).toHaveTextContent(0.00)
        //define vanillaInput
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        //add vanilla to 1
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        //check grandtotal 4.00
        expect(grandtotal).toHaveTextContent('4.00')
        const cherrieCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
        //cherriesCheckbox to check
        userEvent.click(cherrieCheckbox)
        //grandtotal 1.50
        expect(grandtotal).toHaveTextContent('5.50')

    });
    test('grand total updates properly if toppings adding first', async () => {
        render(<OrderEntry  />);
        //define grandtotal
        const grandtotal = await screen.findByRole('heading', { name: /grand total: \$/i });
        //define cherriesCheckbox
        const cherrieCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
        //cherriesCheckbox to check
        userEvent.click(cherrieCheckbox)
        //grandtotal 1.50
        expect(grandtotal).toHaveTextContent('1.50')
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        //add vanilla to 1
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')
        //check grandtotal 3.50
        expect(grandtotal).toHaveTextContent('3.50')
    });
    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry  />);
        const grandtotal = await screen.findByRole('heading', { name: /grand total: \$/i });
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        //add vanilla to 1
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')
        //check grandtotal 2.00
        expect(grandtotal).toHaveTextContent('2.00')
        //add vanilla to 0
        userEvent.type(vanillaInput, '0')
        //grandtotal 0.00
        expect(grandtotal).toHaveTextContent('0.00')
    });
})