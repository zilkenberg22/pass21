import withAuth from "@/middleware/auth";
import React from "react";

export default function Notes() {
  return <div>Notes</div>;
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
