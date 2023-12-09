import { NextApiRequest, NextApiResponse } from 'next';

import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

const XMTPSendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!);
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(wallet, { env: "production" })
    // Start a conversation with XMTP
    const conversation = await xmtp.conversations.newConversation(
        '0xf1996154C34e3dc77b26437a102231785e9aD7fE'
    )

    // Send a message
    const response = await conversation.send('gm gm ETHINDIAAAAAA!!!')

    return res.status(200).json({ status: JSON.stringify(response) });
};

export default XMTPSendMessage;
