import '@/styles/globals.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Theme
    // appearance='dark'
    accentColor="gold"
    grayColor="gray"
    panelBackground="solid"
    scaling="100%"

  >
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500&display=swap" rel="stylesheet" />

    <div className="bg-[#faf8f3] text-[#646464]">
      <div className="mx-auto max-w-screen-xl px-1 md:px-4 sm:px-6 relative">
        <Component {...pageProps} />
      </div>
    </div>
  </Theme>
}
