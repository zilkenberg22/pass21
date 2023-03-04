import Tokens from "csrf";
import connectMongo from "@/lib/dbConnect";
import { encrypt } from "@/lib/tools";
import Logins from "@/models/LoginsModel";

const tokens = new Tokens();

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  switch (req.method) {
    case "GET":
      try {
        const userId = req.headers.authorization.split(" ")[1];
        const logins = await Logins.find({ user: userId });
        res.status(200).json({ success: true, data: logins });
      } catch (error) {
        console.log(error, "error");
      }
      break;
    case "POST":
      try {
        const csrfToken = req.headers["x-csrf-token"];

        if (!tokens.verify(process.env.NEXTAUTH_SECRET, csrfToken)) {
          return res.status(403).json({ message: "Invalid CSRF token" });
        }

        if (!req.body)
          return res.status(404).json({ message: "Don't have form data...!" });
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
            password: encrypt(password),
            user,
          },
          function (err, data) {
            if (err) return res.status(404).json({ err });
            res.status(201).json({
              status: true,
              message: "Таны бүртгэл амжилттай.",
            });
          }
        );
      } catch (error) {
        console.log(error, "error");
      }
      break;
    default:
      break;
  }
}
