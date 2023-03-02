import { showLoader } from "@/lib/tools";
import withAuth from "@/middleware/auth";
import React from "react";

export default function Address() {
  return (
    <div>
      Address
      <button
        onClick={() => {
          showLoader(true);
        }}
      >
        test
      </button>
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
