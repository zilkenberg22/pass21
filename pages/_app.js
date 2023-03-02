import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div id="khuleelgeKharuulakhEsekh" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
