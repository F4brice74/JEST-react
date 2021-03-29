import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  // reset handler
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable Order button for no scoops", async () => {
  render(<OrderEntry />);
  // define Scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // define OrderButton
  const orderButton = screen.getByRole("button", { name: "Order Sundae !" });
  //set scoop to zero
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  // check if button is disabled
  expect(orderButton).toBeDisabled();

  // set scoop to one
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  //check if button is enabled
  expect(orderButton).toBeEnabled();

  // set scoop to zero
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  // check if button is disabled
  expect(orderButton).toBeDisabled();

});
