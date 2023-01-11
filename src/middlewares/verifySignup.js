import { ROLES } from "../models/Roles";
import User from "../models/Users";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  const UserByUsername = await User.findOne({username:username});
  if (UserByUsername)
    return res.status(400).json({ message: "The user already exists." });
  const UserByEmail = await User.findOne({ email: email });
  if (UserByEmail)
    return res.status(400).json({ message: "The email already exists." });
  next();
};
export const checkRolesExists = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};
