import { getUser } from "../services/auth.js";

async function authCheckLoginOnly(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect("/login");
  }

  const user = getUser(token);

  if (!user) {
    res.clearCookie("token");
    return res.redirect("/login");
  }

  req.user = user;
  res.locals.user = user;
  return next();
}

export { authCheckLoginOnly };

// [ req.user = user; =====>> means ----> (adds a new property named user)]
// req = {
//   cookies: {
//     token: "..."
//   },
//   user: {
//     user: "MongoDB-user-id",
//     name: "Krishna",
//     iat: 1780000000,
//   }
// };
