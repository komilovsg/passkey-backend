const authService = require("../services/authService");

exports.registerGenerateOptions = async (request, reply) => {
  try {
    console.log("User data received:", request.body);
    const options = await authService.generateRegistrationOptions(request.body);
    request.session.challenge = options.challenge;
    reply.send(options);
  } catch (error) {
    console.error("Error during registration options generation:", error);
    reply
      .status(500)
      .send({ message: "Ошибка генерации опций регистрации", error });
  }
};

exports.registerVerify = async (request, reply) => {
  try {
    const verification = await authService.verifyRegistrationResponse(
      request.body,
      request.session.challenge
    );
    if (verification.verified) {
      reply.send({ verified: true });
    } else {
      reply.status(400).send({ verified: false });
    }
  } catch (error) {
    reply.status(500).send({ message: "Ошибка верификации", error });
  }
};
