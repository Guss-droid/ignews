import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import Home, { getStaticProps } from "../../pages"
import { stripe } from "../../services/stripe"

jest.mock("../../services/stripe")
jest.mock("next/router")
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false]
  }
})

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ amount: "10£", priceId: "fakeId" }} />)

    expect(screen.getByText(/10£/i)).toBeInTheDocument()
  })

  it("loads correctly products", async () => {
    const stripeRetriveMocked = mocked(stripe.prices.retrieve)

    stripeRetriveMocked.mockResolvedValueOnce({
      id: "fakeId",
      unit_amount: 1000
    } as any)

    const res = await getStaticProps({})

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fakeId",
            amount: "$10.00"
          }
        }
      })
    )
  })
})