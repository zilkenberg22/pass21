import withAuth from "@/middleware/auth";
import React from "react";

export default function Phones() {
  return <div>Phones</div>;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
