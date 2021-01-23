import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../utils/auth0";

export default async function register(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await auth0.handleLogin(req, res, {
      authParams: {
        screen_hint: "signup"
      }
    });
  } catch(error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
