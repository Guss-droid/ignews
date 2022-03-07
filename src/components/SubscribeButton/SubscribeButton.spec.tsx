import { render, screen, fireEvent } from "@testing-library/react"
import { signIn, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { mocked } from "ts-jest/utils"
import { SubscribeButton } from "."

jest.mock("next-auth/client")
jest.mock("next/router")

describe("SubscribeButton", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("redirect to signIn when user is not authenticated", () => {
    const signInMocked = mocked(signIn)

    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe now")
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it("redirect to posts when user is subscribed", () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()
    
    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com"
      },
      activeSubscription: "yes",
      expires: "fake-expires"
    }, false])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe now")
    fireEvent.click(subscribeButton)

    expect(pushMock).toBeCalledWith("/posts")
  })
})