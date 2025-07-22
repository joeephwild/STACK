import { ThirdwebProvider } from '@thirdweb-dev/react-native';
import { Etherlink } from '@thirdweb-dev/chains';

const clientId = process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!;

export const thirdwebConfig = {
  clientId,
  activeChain: Etherlink,
  supportedChains: [Etherlink],
};

export { ThirdwebProvider };