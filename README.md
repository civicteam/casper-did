# Casper-DID

A simple library for converting casper keys to W3C compliant DIDs and vice versa.

## Usage

```javascript
import {
    convertCasperPubkeyToDid,
    convertDidToCasperPubkey,
} from "@civic/casper-did";

// Handles Secp256k1 keys (prefixed with 02 in casper addresses)
convertCasperPubkeyToDid("0202a9288f6be41767209b9b0a80e5253ac2ebe00c31d175345ecab9dfa231de6c59")
// did:key:zQ3shYo7XemChSbyT2y4K9m5PUj576JYpKiPm9ZHRY5uJoDBe

convertDidToCasperPubkey("did:key:zQ3shYo7XemChSbyT2y4K9m5PUj576JYpKiPm9ZHRY5uJoDBe")
// 0202a9288f6be41767209b9b0a80e5253ac2ebe00c31d175345ecab9dfa231de6c59

// Handles Ed25519 keys (prefixed with 01 in casper addresses)
convertCasperPubkeyToDid("01053ce2369857632f86575d657ee4f24b1efb3e9ba865d3fbf1fed986bf7a2601")
// did:key:z6Mkeohvt1YAgyWbmk8YB63c787HmXfsC7k81h2u24FNYqck

convertDidToCasperPubkey("did:key:z6Mkeohvt1YAgyWbmk8YB63c787HmXfsC7k81h2u24FNYqck")
// 01053ce2369857632f86575d657ee4f24b1efb3e9ba865d3fbf1fed986bf7a2601
