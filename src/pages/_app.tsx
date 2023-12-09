import '@/styles/globals.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { LightNode } from '@waku/sdk';
import { createNode } from '@/utils/waku';

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
          {wakuNode ? (
            <Component {...pageProps} node={wakuNode} />
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </Theme>
  );
}
