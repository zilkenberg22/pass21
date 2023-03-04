import React from "react";
import withAuth from "@/middleware/auth";
import PagesHeader from "@/components/PagesHeader";

export default function Phones() {
  return (
    <div>
      <PagesHeader title="Phones" />
      <div>asd</div>
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
