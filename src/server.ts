import "dotenv/config";
import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";

const app = fastify({ logger: true });

app.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 5005 });
    console.log(
      `Сервер запущен на http://localhost:${process.env.PORT || 5005}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
