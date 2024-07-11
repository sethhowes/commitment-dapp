import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi'
import {
  polygonAmoy,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'commit',
  projectId: '0f24a48931261530081fbdf8dc768630',
  chains: [
    polygon,
    polygonAmoy,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [sepolia.id]: http(),
  },

  ssr: true,
});
