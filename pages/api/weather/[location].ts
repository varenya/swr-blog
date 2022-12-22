import { NextApiRequest, NextApiResponse } from "next";

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const location = req.query.location;
    if (location === "istanbul") {
      return res.status(500).json({ available: 0 });
    }
    if (location === "delhi") {
      await delay(2000);
      return res
        .status(200)
        .json({ available: 1, humidity: 10, temperature: 30 });
    }
    if (location === "london") {
      await delay(2000);
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
