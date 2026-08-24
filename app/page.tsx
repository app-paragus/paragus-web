import { Nav, Hero, Marquee, Bento, Failures, FinalCta, Footer } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Bento />
        <Failures />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
