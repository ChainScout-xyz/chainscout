import { NextApiRequest, NextApiResponse } from 'next';

import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

const XMTPSendMessage = async (req: NextApiRequest, res: NextApiResponse) => {

    const { wallet_address, message } = req.body;

    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!);

    const xmtp = await Client.create(wallet, { env: "production" })

    for (const walletAddress of wallet_address) {
        const conversation = await xmtp.conversations.newConversation(
            walletAddress
        )
        const response = await conversation.send(message)
    }


    return res.status(200).json({ status: 'okay' });
};

export default XMTPSendMessage;
