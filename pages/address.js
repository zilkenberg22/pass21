import React from "react";
import withAuth from "@/middleware/auth";
import PagesHeader from "@/components/PagesHeader";

export default function Address() {
  return (
    <div>
      <PagesHeader title="Address" />
      <div>asd</div>
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
