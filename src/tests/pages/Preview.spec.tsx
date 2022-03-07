import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { mocked } from "ts-jest/utils"
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock("../../services/prismic")
jest.mock("next-auth/client")
jest.mock("next/router")

const post = {
  slug: "Fake slug",
  title: "Fake title",
  content: "<p>Fake content</p>",
  updateAt: "Fake date"
}

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText("Fake title")).toBeInTheDocument()
    expect(screen.getByText("Fake content")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it("redirect user to full post when subscribed", async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "yes" },
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toBeCalledWith("/posts/Fake slug")
  })

  it("if data is loaded", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: "heading", text: "Fake title" }
          ],
          content: [
            { type: "paragraph", text: "Fake content" }
          ]
        },
        last_publication_date: "Fake date",
      })
    } as any)

    const res = await getStaticProps({
      params: {
        slug: "Fake slug"
      }
    } as any)

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "Fake slug",
            title: "Fake title",
            content: "<p>Fake content</p>",
            updateAt: "Invalid Date"
          }
        }
      })
    )
  })
})