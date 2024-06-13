import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET_KEY = "moon_dev";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Allow", ["POST"]);

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { username, password } = req.body;

  // Mock user authentication
  if (username === "user" && password === "pass") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
