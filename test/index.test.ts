import {
    convertCasperPubkeyToDid,
    convertDidToCasperPubkey,
} from "../src";
import {expect} from "chai";

describe("Casper-DID", () => {
    context("secp256k1", () => {
        it("should convert a secp256k1 public key to a did", () => {
            expect(
                convertCasperPubkeyToDid("0202a9288f6be41767209b9b0a80e5253ac2ebe00c31d175345ecab9dfa231de6c59")
            ).to.equal("did:key:zQ3shYo7XemChSbyT2y4K9m5PUj576JYpKiPm9ZHRY5uJoDBe")
        });

        it("should convert a did to a secp256k1 public key", () => {
            expect(
                convertDidToCasperPubkey("did:key:zQ3shYo7XemChSbyT2y4K9m5PUj576JYpKiPm9ZHRY5uJoDBe")
            ).to.equal("0202a9288f6be41767209b9b0a80e5253ac2ebe00c31d175345ecab9dfa231de6c59")
        })
    });

    context("ed25519", () => {
        it("should convert an ed25519 public key to a did", () => {
            expect(
                convertCasperPubkeyToDid("01053ce2369857632f86575d657ee4f24b1efb3e9ba865d3fbf1fed986bf7a2601")
            ).to.equal("did:key:z6Mkeohvt1YAgyWbmk8YB63c787HmXfsC7k81h2u24FNYqck");
        });
        it("should convert a did to an ed25519 public key", () => {
            expect(
                convertDidToCasperPubkey("did:key:z6Mkeohvt1YAgyWbmk8YB63c787HmXfsC7k81h2u24FNYqck")
            ).to.equal("01053ce2369857632f86575d657ee4f24b1efb3e9ba865d3fbf1fed986bf7a2601")
        });
    });
})