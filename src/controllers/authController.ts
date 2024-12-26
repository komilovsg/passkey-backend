import * as authService from "../services/authService.js";
import { FastifyReply, FastifyRequest } from "fastify";

//--------------------------------------------------------------------------------//
//--------------------------------РЕГИСТРАЦИЯ-------------------------------------//
//--------------------------------------------------------------------------------//
//регистрация пользователя
export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const { username } = req.body as { username: string };
  const options = authService.generateRegistrationOptions(username);
  reply.send(options);
};

//проверка регистрации
export const verifyRegistration = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { username, response } = req.body as {
    username: string;
    response: any;
  };
  const result = await authService.verifyRegistration(username, response);
  reply.send(result);
};

//--------------------------------------------------------------------------------//
//------------------------------------ВХОД----------------------------------------//
//--------------------------------------------------------------------------------//
//генерация challange для входа
export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { username } = req.body as { username: string };
  const options = authService.generateLoginOptions(username);
  reply.send(options);
};

//проверка входа
export const verifyLogin = async (req: FastifyRequest, reply: FastifyReply) => {
  const { username, response } = req.body as {
    username: string;
    response: any;
  };
  const result = await authService.verifyLogin(username, response);
  reply.send(result);
};
