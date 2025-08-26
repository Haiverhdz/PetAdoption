import passport from "../lib/passport";
import { NextApiRequest, NextApiResponse } from "next";

interface JwtUser {
  id: string;
  email: string;
  name: string;
}

interface NextApiRequestWithUser extends NextApiRequest {
  user?: JwtUser;
}

export const authenticateJWT = (
  req: NextApiRequestWithUser,
  res: NextApiResponse,
  next: () => void
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: JwtUser | false) => {
      if (err || !user) return res.status(401).json({ message: "No autorizado" });
      req.user = user;
      next();
    }
  )(req, res, next);
};
