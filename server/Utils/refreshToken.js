import argon2 from "argon2";

export const hashRefreshToken = async (token) => {
  return await argon2.hash(token);
};

export const verifyRefreshTokenHash = async (
  token,
  tokenHash
) => {
  try {
    return await argon2.verify(tokenHash, token);
  } catch {
    return false;
  }
};