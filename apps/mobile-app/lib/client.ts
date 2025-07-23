import { createThirdwebClient } from 'thirdweb';
import { etherlink } from 'thirdweb/chains';

const clientId = process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!;

export const client = createThirdwebClient({
  clientId,
});

export const chain = etherlink;