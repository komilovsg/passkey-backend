const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} = require("@simplewebauthn/server");

exports.generateRegistrationOptions = async (userData) => {
  const options = generateRegistrationOptions({
    rpName: "TestProject",
    rpID: process.env.RP_ID || "localhost",
    userID: userData.username,
    userName: userData.username,
    attestationType: "indirect",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });
  return options;
};

exports.verifyRegistrationResponse = async (response, expectedChallenge) => {
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: process.env.EXPECTED_ORIGIN || "http://localhost:5005",
    expectedRPID: process.env.RP_ID || "localhost",
  });
  return verification;
};
