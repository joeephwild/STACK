import { createThirdwebClient } from "thirdweb";

const secretKey = "bkn-DIfzX2ePx3w2ima_NJQz4J6IWK-UnHkPOoIwJd4XQMtsfq6BU7UNUrRLcA3DfUjRR8eOILpKWR9IVB9Fgw";

export const thirdwebClient = createThirdwebClient({
   secretKey:  secretKey,
    clientId: process.env.THIRDWEB_CLIENT_ID
});
