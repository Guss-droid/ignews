import Head from "next/head"
import Link from 'next/link'
import { GetStaticProps } from "next"

import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../../services/prismic"

import styles from '../posts.module.scss'
import { useSession } from "next-auth/client"
import { useEffect } from "react"
import { useRouter } from "next/router"

interface IPostPreview {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  }
}

export default function PostPreview({ post }: IPostPreview) {

  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {

    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }

  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const prismic = getPrismicClient()
  const { slug } = params

  const res = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(res.data.title),
    content: RichText.asHtml(res.data.content.splice(0, 3)),
    updateAt: new Date(res.last_publication_date).toLocaleDateString('pt-BR', {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  return {
    props: {
      post
    },
    redirect: 60 * 30
  }
}