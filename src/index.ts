import {decode, encode} from 'bs58'

type KeyType = 'SECP256K1' | 'ED15519';

const secp256k1MulticodecPrefix = Buffer.from([0xe7, 0x01]);
const ed25519MulticodecPrefix = Buffer.from([0xed, 0x01]);

const mbPrefix = "z"
const didPrefix = "did:key:"

const bytesToDid = (bytes: Buffer, type: KeyType): string => {
    const multicodecPrefix = type === 'SECP256K1' ? secp256k1MulticodecPrefix : ed25519MulticodecPrefix;
    const bytesWithMulticodecPrefix = Buffer.concat([multicodecPrefix, bytes])
    const bytesInBase58 = encode(bytesWithMulticodecPrefix)
    return didPrefix + mbPrefix + bytesInBase58;
}

const stringToDid = (str: string, type: KeyType): string => {
    const bytes = Buffer.from(str, 'hex');
    return bytesToDid(bytes, type);
}

const convertSecp256k1PubkeyToDid = (pubkey: string): string => stringToDid(pubkey, 'SECP256K1');
const convertEd25519PubkeyToDid = (pubkey: string): string => stringToDid(pubkey, 'ED15519');

const convertDidToSecp256k1Pubkey = (did: string): string => {
    const bytesInBase58 = did.slice(didPrefix.length + mbPrefix.length)
    const bytesWithMulticodecPrefix = decode(bytesInBase58);
    const multicodecPrefix = Buffer.from([0xe7, 0x01])
    const bytes = Buffer.from(bytesWithMulticodecPrefix.slice(multicodecPrefix.length))
    return bytes.toString("hex");
}

// Input is a did-key representing either a secp256k1 or ed25519 public key
// in multibase. See: https://w3c-ccg.github.io/did-method-key/
export const convertDidToCasperPubkey = (did: string): string => {
    const bytesInBase58 = did.slice(didPrefix.length + mbPrefix.length)
    const bytesWithMulticodecPrefix = decode(bytesInBase58);

    // check if the bytes start with the multicodec prefix for secp256k1 or ed25519
    const bytes = Buffer.from(bytesWithMulticodecPrefix)
    const pubkey = bytes.slice(secp256k1MulticodecPrefix.length).toString("hex");
    if (bytes.slice(0, secp256k1MulticodecPrefix.length).equals(secp256k1MulticodecPrefix)) {
        return "02" + pubkey;
    } else if (bytes.slice(0, ed25519MulticodecPrefix.length).equals(ed25519MulticodecPrefix)) {
        return "01" + pubkey;
    } else {
        throw new Error("Unrecognised multicodec prefix");
    }
}


// Input is either:
// a 32-byte ed25519 public key with a fixed "01" prefix (total 66 chars in hex)
// or a 33-byte secp256k1 compressed public key with a fixed "02" prefix (total 68 chars in hex)
// See: https://docs.casper.network/concepts/accounts-and-keys/)
export const convertCasperPubkeyToDid = (casperPubkey: string): string => {
    if (casperPubkey.slice(0, 2) === "01") return convertEd25519PubkeyToDid(casperPubkey.slice(2));
    if (casperPubkey.slice(0, 2) === "02") return convertSecp256k1PubkeyToDid(casperPubkey.slice(2));
    throw new Error("Unrecognised Casper pubkey prefix");
}

