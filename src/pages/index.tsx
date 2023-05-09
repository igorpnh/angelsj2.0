import Head from "next/head";
import Navbar from "./components/navbar";
import Hero from "./components/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Angel Semijoias</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Hero />
    </>
  );
}
