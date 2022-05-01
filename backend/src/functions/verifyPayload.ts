import { verifySignature } from "@taquito/utils";

export const verifyPayload = (
  payload: string,
  publicKey: string,
  signature: string
) => {
  try {
    const verified = verifySignature(payload, publicKey, signature);

    return verified;
  } catch (err) {
    return false;
  }
};
