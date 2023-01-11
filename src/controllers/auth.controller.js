import User from "../models/Users";
import jwt from "jsonwebtoken";
import config from "../config";
import Rol from "../models/Roles";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body;

    const newUser = new User({
      name,
      email,
      password: await User.encryptPassword(password),
    });
    // si se envia un rol
    if (rol) {
      //se busca y se registra con el rol
      const foundRol = await Rol.findOne({ name: { $in: rol } });
      newUser.roleId = foundRol._id;
    } else {
      //se busca el id del rol "user" y se registra con el rol
      const role = await User.findOne({ name: { $in: "user" } });
      newUser.roleId = role._id;
    }
    //se crea el usuario en la db
    const createdUser = await newUser.save();
    // se genera un token
    const token = jwt.sign({ id: createdUser._id }, config.SECRETAPI_KEY, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email }).populate("roleId");
    if (!userFound) return res.status(404).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: userFound._id }, config.SECRETAPI_KEY, {
      expiresIn: 86400,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(
      res
        .status(500)
        .json({ message: "Error al consultar el usuario en el servidor" })
    );
  }
};
