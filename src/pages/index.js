import Head from 'next/head';
import Dashbaord from './dashboard';

export default function Home() {
  return (
    <>
        <Head>
          <title>Marus Dashbaord</title>
          <meta name="description" content="Dashboard developed by Marvan" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <Dashbaord />
        </main>
    </>
  )
}
