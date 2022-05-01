import { UserInputError } from "apollo-server-core";
import { convertHexToNumber } from "./convertHexToNumber";
import { convertHexToString } from "./convertHexToString";

export const decodePayload = (payload: string) => {
  const matches = payload.match(
    /^0501(?<len>[0-9a-f]{8})(?<bytes>(?:(?:[0-9a-f]{2})+))$/i
  );

  if (
    !matches ||
    !matches.groups ||
    !matches.groups.len ||
    !matches.groups.bytes
  ) {
    throw new UserInputError(`Failed to decode payload.`);
  }

  const len = matches.groups.len;

  const bytes = matches.groups.bytes;

  const length = convertHexToNumber(len);

  if (bytes.length !== length) {
    throw new UserInputError(
      `Failed to decode payload. (Payload length invalid)`
    );
  }

  const decoded = convertHexToString(bytes);

  return decoded;
};
