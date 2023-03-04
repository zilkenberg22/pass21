import connectMongo from "@/lib/dbConnect";
import { encrypt } from "@/lib/tools";
import Users from "@/models/UserModel";

export default async function handler(req, res) {
  connectMongo().catch((error) =>
    res.json({ error: "Өгөгдлийн сантай холбогдож чадахгүй байна!" })
  );

  if (req.method === "POST") {
    const { email, password } = req.body;

    const checkexisting = await Users.findOne({ email });
    if (checkexisting)
      return res.status(422).json({ message: "Бүртгэлтэй э-мэйл хаяг байна!" });

    Users.create(
      {
        email,
        password: encrypt(password),
      },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({
          status: true,
          message: "Таны бүртгэл амжилттай үүслээ",
        });
      }
    );
  } else {
    res.status(500).json({ message: "Өө алдаа гарчихлаа" });
  }
}
