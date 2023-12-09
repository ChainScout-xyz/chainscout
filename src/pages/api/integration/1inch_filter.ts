import { NextApiRequest, NextApiResponse } from 'next';
const axios = require("axios");

const OneInchFilter = async (req: NextApiRequest, res: NextApiResponse) => {

    // Extract walletAddress from the POST request body
    const { wallet_address } = req.body;


    if (!wallet_address) {
        return res.status(400).json({ error: 'Invalid wallet address provided' });
    }


    const url = `https://api.1inch.dev/history/v2.0/history/${wallet_address}/events`;


    const config = {
        headers: {
            "Authorization": `Bearer ${process.env.ONEINCH_API}`
        },
        params: {}
    };

    try {

        const response = await axios.get(url, config);
        const data = response.data.items;

        return res.json({
            success: data.items.length > 0
        })

    } catch (error) {

        return res.json({
            success: false
        });
    }

};

export default OneInchFilter;
