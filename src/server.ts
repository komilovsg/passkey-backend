import "dotenv/config";
const fastify = require("fastify")({ logger: true });
const authRoutes = require("./routes/authRoutes");

// Регистрация плагинов
fastify.register(require("@fastify/jwt"), {
  secret: process.env.JWT_SECRET,
});
fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/session"), {
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false }, // Установите true в продакшене
});

// Регистрация маршрутов
fastify.register(authRoutes, { prefix: "/webauthn" });

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5005 });
    fastify.log.info(`Сервер запущен на ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
