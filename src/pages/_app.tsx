import { AppProps } from "next/app"
import { NavBar } from "../components/NavBar"

import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}