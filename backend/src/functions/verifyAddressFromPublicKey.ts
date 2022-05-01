import { b58cdecode, b58cencode, prefix } from "@taquito/utils";
import { hash } from "@stablelib/blake2b";

const pref = {
  ed: {
    pk: prefix["edpk"],
    sk: prefix["edsk"],
    pkh: prefix.tz1,
    sig: prefix.edsig,
  },
  p2: {
    pk: prefix["p2pk"],
    sk: prefix["p2sk"],
    pkh: prefix.tz3,
    sig: prefix.p2sig,
  },
  sp: {
    pk: prefix["sppk"],
    sk: prefix["spsk"],
    pkh: prefix.tz2,
    sig: prefix.spsig,
  },
};

export const verifyAddressFromPublicKey = (
  address: string,
  publicKey: string
) => {
  const curve = publicKey.substring(0, 2) as "ed" | "p2" | "sp";

  if (!["ed", "p2", "sp"].includes(curve)) {
    return false;
  }

  const _publicKey = b58cdecode(publicKey, pref[curve].pk);

  const publicKeyHash = b58cencode(hash(_publicKey, 20), pref[curve].pkh);

  return publicKeyHash === address;
};
