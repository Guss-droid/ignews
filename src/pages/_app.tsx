import { Provider as NextAuthProvider } from "next-auth/client"
import { AppProps } from "next/app"
import { NavBar } from "../components/NavBar"

import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}