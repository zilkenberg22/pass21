import connectMongo from "@/lib/dbConnect";
import Logins from "@/models/LoginsModel";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { website, url, email, username, password, phone, notes, user } =
      req.body;

    Logins.create(
      {
        website,
        url,
        email,
        username,
        phone,
        notes,
        password: await hash(password, 12),
        user,
      },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({
          status: true,
          user: data,
          message: "Таны бүртгэл амжилттай.",
        });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
