import { Nav, Hero, Marquee, Showcase, Bento, Failures, FinalCta, Footer } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <Bento />
        <Failures />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
