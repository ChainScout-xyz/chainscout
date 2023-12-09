import '@/styles/globals.css';
import { createNode } from '@/utils/waku';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { LightNode } from '@waku/sdk';
import { AnonAadhaarProvider } from 'anon-aadhaar-react';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const app_id = process.env.NEXT_PUBLIC_APP_ID || '';

export default function App({ Component, pageProps }: AppProps) {
  const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
  useEffect(() => {
    if (wakuNode) return;
    (async () => {
      console.log('starting node');
      const node = await createNode();
      console.log('node started');
      setWakuNode(node);
    })();
  }, [wakuNode]);

  return (
    <Theme
      // appearance='dark'
      accentColor='gold'
      grayColor='gray'
      panelBackground='solid'
      scaling='100%'
    >
      <div className='bg-[#faf8f3] text-[#646464]'>
        <div className='mx-auto max-w-screen-xl px-1 md:px-4 sm:px-6 relative'>
          <MetaMaskProvider
            debug={false}
            sdkOptions={{
              checkInstallationImmediately: true,
              dappMetadata: {
                name: 'chainScout',
                // url: window.location.host,
              },
            }}
          >
            <AnonAadhaarProvider _appId={app_id}>
              {wakuNode ? (
                <Component {...pageProps} node={wakuNode} />
              ) : (
                <div className='min-h-screen grid place-items-center text-gray-500'>
                  <p className='flex items-center '>
                    <img
                      src='/loader.svg'
                      alt='loader'
                      className='w-6 h-6'
                    />
                    Connecting to nodes! Loading!!!!...</p>
                </div>
              )}
            </AnonAadhaarProvider>
          </MetaMaskProvider>
        </div>
      </div>
    </Theme>
  );
}
