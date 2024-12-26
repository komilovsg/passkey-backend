import {
  generateRegistrationOptions as generateRegistrationOptionsFromLib,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

// Временное хранилище пользователей
const users: Map<string, any> = new Map();

// Генерация параметров для регистрации
export const generateRegistrationOptions = (username: string) => {
  const userID = new TextEncoder().encode(username);

  const options = generateRegistrationOptionsFromLib({
    rpName: "My App",
    rpID: "localhost",
    userID,
    userName: username,
  });

  // Сохраняем challenge
  users.set(username, { ...users.get(username), registrationOptions: options });
  return options;
};

// Функция для проверки регистрации
export const verifyRegistration = async (username: string, response: any) => {
  const expectedChallenge = "your-expected-challenge"; // Используйте challenge, который вы отправили клиенту
  const expectedOrigin = "http://localhost:5005"; // Замените на ваш реальный origin
  const expectedRPID = "localhost"; // Домен вашего RP (Relying Party)

  // Формируем объект для проверки ответа
  const verificationResult = await verifyRegistrationResponse({
    response, // Ответ от клиента
    expectedChallenge, // Ожидаемый challenge
    expectedOrigin, // Ожидаемый origin
    expectedRPID, // Ожидаемый RP ID
  });

  // Логика обработки результата верификации
  if (verificationResult.verified) {
    console.log("Регистрация успешна");
    return {
      success: true,
      credential: verificationResult.registrationInfo, // Сохраняем credential, если нужно
    };
  } else {
    console.error("Ошибка регистрации");
    return { success: false, message: "Ошибка верификации регистрации" };
  }
};

// Генерация параметров для входа
export const generateLoginOptions = (username: string) => {
  const user = users.get(username);
  if (!user || !user.credential) throw new Error("User not registered");

  const options = generateAuthenticationOptions({
    rpID: "localhost",
    allowCredentials: [
      {
        id: user.credential.id,
        transports: user.credential.transports,
      },
    ],
  });

  user.authOptions = options;
  users.set(username, user);
  return options;
};

// Проверка входа
export const verifyLogin = async (username: string, response: any) => {
  const user = users.get(username);
  if (!user || !user.authOptions) {
    throw new Error("User not found or not logged in");
  }

  const verification = await verifyAuthenticationResponse({
    response, // Ответ от клиента
    expectedChallenge: user.authOptions.challenge, // Challenge, который мы отправили
    expectedOrigin: "http://localhost", // Origin приложения
    expectedRPID: "localhost", // Ваш RP ID
    credential: user.credential,
  });

  return { success: verification.verified };
};
