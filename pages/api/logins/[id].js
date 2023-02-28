import connectMongo from "@/lib/dbConnect";
import { decrypt, encrypt } from "@/lib/tools";
import Logins from "@/models/LoginsModel";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const login = await Logins.findById(id);
        login.password = decrypt(login.password);
        res.status(200).json({ status: true, data: login });
      } catch (error) {
        console.log(error, "error");
      }
      break;
    case "PUT":
      try {
        const { ...other } = req.body;
        other.password = encrypt(other.password);
        const newForm = {
          website: other.website,
          url: other.url,
          email: other.email,
          password: other.password,
          username: other.username,
          phone: other.phone,
          notes: other.notes,
        };
        const login = await Logins.findByIdAndUpdate(id, newForm, {
          new: true,
          runValidators: true,
        });
        if (!login) {
          return res.status(400).json({ status: false });
        }
        res.status(200).json({ status: true });
      } catch (error) {
        res.status(400).json({ status: false });
      }
      break;
    case "DELETE":
      try {
        const deletedPet = await Logins.deleteOne({ _id: id });
        if (!deletedPet) {
          return res.status(400).json({ status: false });
        }
        res.status(200).json({ status: true });
      } catch (error) {
        res.status(400).json({ status: false });
      }
      break;
    default:
      break;
  }
}
