import connectMongo from "@/lib/dbConnect";
import Logins from "@/models/LoginsModel";

export default async function handler(req, res) {
  console.log(req, "req");
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));
  switch (req.method) {
    case "GET":
      try {
        const count = await Logins.countDocuments();
        res.status(200).json({ success: true, data: count });
      } catch (error) {
        console.log(error, "error");
      }
      break;
    default:
      break;
  }
}
