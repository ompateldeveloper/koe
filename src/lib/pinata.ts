import { PinataSDK } from "pinata-web3";
const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_URL,
});

export { pinata };