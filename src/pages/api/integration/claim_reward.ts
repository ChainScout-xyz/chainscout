import { abi, rpcConfig } from '@/constants/contract';
import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
const axios = require("axios");

const claim = async ({ id, address }: { id: Number, address: String }) => {

    const defaultChainId = 11155111
    const _provider = new ethers.providers.JsonRpcProvider(rpcConfig[defaultChainId])
    const contract = new ethers.Contract(allChainAddress, abi, Signer)
    const wallet = new ethers.Wallet(process.env.AIRDROP_WALLET!, _provider)
    const send = await contract.sendAirdrop(id, address)
    console.log(send)

}

const ClaimReward = async (req: NextApiRequest, res: NextApiResponse) => {

    const { wallet_address } = req.body;


    try {

        const response = await claim(id, wallet_address)

        return res.json({
            response
        })

    } catch (error) {

        return res.json({
            success: false
        });
    }

};

export default ClaimReward;
