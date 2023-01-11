import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExists,
} from "../middlewares/verifySignup";

const authRoutes = new Router();

authRoutes.post("/signin", signIn);
authRoutes.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExists],
  signUp
);

export default authRoutes;
