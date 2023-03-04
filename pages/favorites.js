import withAuth from "@/middleware/auth";
import React from "react";

export default function Favorites() {
  console.log("first");
  return <div>Favorites</div>;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
