import passport from "../lib/passport";
import { NextApiRequest, NextApiResponse } from "next";

export const authenticateJWT = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ message: "No autorizado" });
    req.user = user;
    next();
  })(req, res);
};
