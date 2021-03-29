import {render, screen} from '../../../test-utils/testing-library-utils'
import  { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation'

test('display alert on server error response in order confirmation',async()=>{
render(<OrderConfirmation setOrderPhase={jest.fn()}/>)
//reset server
server.resetHandlers(
rest.post('http://localhost:3030/order', (req, res, ctx)=>res(ctx.status(500)))
)
//find button
const alerts = await screen.findByRole('alert')

//expect alert to be here
expect(alerts).toBeInTheDocument();



})