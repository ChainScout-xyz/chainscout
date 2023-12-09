import { useSDK } from '@metamask/sdk-react';
import { useState } from 'react';

const useMetamask = () => {
    const [account, setAccount] = useState<string>();
    const { sdk, connected, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount((accounts as any)?.[0]);
            console.log('here')
        } catch (err) {
            console.warn(`failed to connect..`, err);
        }
    };


    const disconnect = async () => {
        try {
            setAccount('');
            await sdk?.disconnect();
            // setAccount((accounts as any)?.[0]);
            console.log('disconnected')
        } catch (err) {
            console.warn(`failed to connect..`, err);
        }
    };

    return {
        connect,
        disconnect,
        account,
        connected, provider, chainId
    }
}

export default useMetamask
