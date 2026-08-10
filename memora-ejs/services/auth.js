import jwt from "jsonwebtoken";
const secret = "Megha$070606$";

function setUser(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secret,
  );

  return token;
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export { setUser, getUser };
