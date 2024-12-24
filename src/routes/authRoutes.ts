const authController = require("../controllers/authController");

async function routes(fastify, options) {
  fastify.post(
    "/register/generate-options",
    authController.registerGenerateOptions
  );
  fastify.post("/register/verify", authController.registerVerify);
}

module.exports = routes;
