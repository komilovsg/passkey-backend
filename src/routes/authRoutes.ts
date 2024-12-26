import * as authController from "../controllers/authController.js";
import { FastifyInstance } from "fastify";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", authController.register);
  app.post("/register/verify", authController.verifyRegistration);
  app.post("/login", authController.login);
  app.post("/login/verify", authController.verifyLogin);
}
