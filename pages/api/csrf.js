import Tokens from "csrf";

const tokens = new Tokens();

export default function handler(req, res) {
  res.json({ csrfToken: tokens.create(process.env.NEXTAUTH_SECRET) });
}
