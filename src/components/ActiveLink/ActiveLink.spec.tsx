import { getByText, render } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe('ActiveLink', () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText("Home")).toBeInTheDocument()
  })

  it("class is active if href match with path", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText("Home")).toHaveClass("active")
  })
})