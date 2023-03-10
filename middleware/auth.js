import { getSession } from "next-auth/react";

export default function withAuth(handler) {
  return async (context) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return handler(context);
  };
}
