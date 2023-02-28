import connectMongo from "@/lib/dbConnect";
import { decrypt } from "@/lib/tools";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { password } = req.body;

    const decryptedPassword = decrypt(password);

    res.status(201).json({
      status: true,
      user: decryptedPassword,
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
