import { SessionProvider } from "next-auth/react"
import Layout from "@/components/layout"
import '../styles/global.css'

export default function App({ Component, pageProps: {session, ...pageProps} }) {

  const getLayout = Component.getLayout || Layout;
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <SessionProvider session={session}>
      {layout}
    </SessionProvider>
  )
}
