import withAuth from "@/middleware/auth";
import React from "react";

export default function Wallets() {
  return <div>Wallets</div>;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
