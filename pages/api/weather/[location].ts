import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const location = req.query.location;
    if (location === "london") {
      return res
        .status(200)
        .json({ available: 1, humidity: 5, temperature: 20 });
    } else {
      res.status(200).json({ available: 0 });
    }
  } catch (err) {
    res.status(200).json({ available: 0 });
  }
}
export default handler;
