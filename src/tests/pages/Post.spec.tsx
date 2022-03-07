import { render, screen } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import Posts, { getStaticProps } from "../../pages/posts"
import { getPrismicClient } from "../../services/prismic"

jest.mock("../../services/prismic")

const posts = [
  {
    slug: "Fake slug",
    title: "Fake title",
    excerpt: "Fake excerpt",
    updatedAt: "Fake date"
  }
]

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText("Fake title")).toBeInTheDocument()
  })

  it("loads correctly products", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "Fake slug",
            data: {
              title: [
                {type: "heading", text: "Fake title"}
              ],
              content:  [
                {type: "paragraph", text: "Fake content"}
              ]
            },
            last_publication_date: "Fake date"
          }
        ]
      })
    } as any)

    const res = await getStaticProps({})

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: "Fake slug",
            title: "Fake title",
            excerpt: "Fake content",
            updatedAt: "Invalid Date"
          }]
        }
      })
    )
  })
})