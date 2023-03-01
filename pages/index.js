import React from "react";
import withAuth from "@/middleware/auth";

export default function Home() {
  return <div>Home</div>;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
