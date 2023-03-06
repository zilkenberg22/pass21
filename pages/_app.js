import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { showLoader } from "@/lib/tools";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  Router.onRouteChangeStart = (url) => {
    showLoader(true);
  };

  Router.onRouteChangeComplete = () => showLoader(false);

  Router.onRouteChangeError = () => showLoader(false);

  return (
    <SessionProvider session={session}>
      <div id="khuleelgeKharuulakhEsekh" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
