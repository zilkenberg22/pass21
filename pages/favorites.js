import React from "react";
import withAuth from "@/middleware/auth";
import PagesHeader from "@/components/PagesHeader";

export default function Favorites() {
  return (
    <div>
      <PagesHeader title="Favorites" />
      <div>asd</div>
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
