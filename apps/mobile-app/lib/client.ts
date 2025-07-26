import { createThirdwebClient } from 'thirdweb';
import { Chain } from 'thirdweb/chains';

const clientId = process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!;

export const client = createThirdwebClient({
  clientId,
});

export const chain: Chain = {
    id: 5115,
    name: 'Citrea Testnet',
    rpc: 'https://rpc.testnet.citrea.xyz',
    blockExplorers: [
       {
        name: "Citrea Explorer",
        url: "https://explorer.testnet.citrea.xyz",
       }
    ],
}
