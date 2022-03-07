import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils"
import { SignInButton } from ".";

jest.mock("next-auth/client")

describe("SignInButton", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText("Sign In With GitHub")).toBeInTheDocument()
  })

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com"
      },
      expires: "fake-expires"
    }, false])

    render(<SignInButton />)

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument()
  })
})