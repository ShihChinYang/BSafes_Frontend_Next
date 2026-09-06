import Head from "next/head";
import ContentPageLayout from "../layouts/contentPageLayout";
import LandingPage from "./landing/LandingPage";

export default function TwinPaperHome() {
  return (
    <>
      <Head>
        <title>Twin Paper — Your Paper, Securely Twinned</title>
        <meta
          name="description"
          content="Paper is where you think. The Twin is how that thought survives, travels, and gets found again — an encrypted image of your page, never transcribed."
        />
      </Head>
      <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
        <LandingPage />
      </ContentPageLayout>
    </>
  );
}
