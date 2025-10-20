import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CC3CBCAAYVNQQMBGDBTA7A7EIIMTLIWRW6S5STVE4TE2ETMWZ3RDZTRC",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAKtJbml0aWFsaXplIGNhbXBhaWduIGJhcnUgZGVuZ2FuIGdvYWwsIGRlYWRsaW5lLCBkYW4gWExNIHRva2VuIGFkZHJlc3MKRnJvbnRlbmQgcGVybHUgcGFzczogb3duZXIgYWRkcmVzcywgZ29hbCAoaW4gc3Ryb29wcyksIGRlYWRsaW5lICh1bml4IHRpbWVzdGFtcCksIHhsbV90b2tlbiAoYWRkcmVzcykAAAAACmluaXRpYWxpemUAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAEZ29hbAAAAAsAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAAJeGxtX3Rva2VuAAAAAAAAEwAAAAA=",
            "AAAAAAAAAGZEb25hdGUga2UgY2FtcGFpZ24gbWVuZ2d1bmFrYW4gWExNIHRva2VuIHRyYW5zZmVyCkZyb250ZW5kIHBlcmx1IHBhc3M6IGRvbm9yIGFkZHJlc3MsIGFtb3VudCAoc3Ryb29wcykAAAAAAAZkb25hdGUAAAAAAAIAAAAAAAAABWRvbm9yAAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAEhHZXQgdG90YWwgYW1vdW50IHlhbmcgc3VkYWggdGVya3VtcHVsCkZyb250ZW5kIGJpc2EgY2FsbCB0YW5wYSBwYXJhbWV0ZXIAAAAQZ2V0X3RvdGFsX3JhaXNlZAAAAAAAAAABAAAACw==",
            "AAAAAAAAAFBHZXQgYmVyYXBhIGJhbnlhayBzcGVjaWZpYyBkb25vciBzdWRhaCBkb25hdGUKRnJvbnRlbmQgcGVybHUgcGFzczogZG9ub3IgYWRkcmVzcwAAAAxnZXRfZG9uYXRpb24AAAABAAAAAAAAAAVkb25vcgAAAAAAABMAAAABAAAACw==",
            "AAAAAAAAAAAAAAATZ2V0X2lzX2FscmVhZHlfaW5pdAAAAAAAAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAIZ2V0X2dvYWwAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAMZ2V0X2RlYWRsaW5lAAAAAAAAAAEAAAAG",
            "AAAAAAAAAAAAAAAPaXNfZ29hbF9yZWFjaGVkAAAAAAAAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAAIaXNfZW5kZWQAAAAAAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAXZ2V0X3Byb2dyZXNzX3BlcmNlbnRhZ2UAAAAAAAAAAAEAAAAL"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        donate: (this.txFromJSON),
        get_total_raised: (this.txFromJSON),
        get_donation: (this.txFromJSON),
        get_is_already_init: (this.txFromJSON),
        get_goal: (this.txFromJSON),
        get_deadline: (this.txFromJSON),
        is_goal_reached: (this.txFromJSON),
        is_ended: (this.txFromJSON),
        get_progress_percentage: (this.txFromJSON)
    };
}
