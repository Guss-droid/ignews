import { render, screen } from "@testing-library/react"
import { getSession } from "next-auth/client"
import { mocked } from "ts-jest/utils"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock("../../services/prismic")
jest.mock("next-auth/client")

const post = {
  slug: "Fake slug",
  title: "Fake title",
  content: "<p>Fake content</p>",
  updateAt: "Fake date"
}

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />)

    expect(screen.getByText("Fake title")).toBeInTheDocument()
    expect(screen.getByText("Fake content")).toBeInTheDocument()
  })

  it("redirect user to home if is not subscribed", async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const res = await getServerSideProps({
      params: {
        slug: "Fake slug"
      }
    } as any)

    expect(res).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/"
        })
      })
    )
  })

  it("if data is loaded", async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "yes"
    } as any)

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

    const res = await getServerSideProps({
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