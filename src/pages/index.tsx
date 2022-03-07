import Head from 'next/head'
import { GetStaticProps } from 'next'

import { stripe } from '../services/stripe'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'

interface IHome {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: IHome) {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>

      <main className={styles.homeContainer}>

        <section className={styles.sectionContent}>
          <span>🔥 Hey, welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1JyicvI2nd52nukOtaDGHC2F')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  }
}