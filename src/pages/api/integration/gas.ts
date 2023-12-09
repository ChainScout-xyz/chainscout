import { fetchQuery, init } from '@airstack/node';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const Gas = async (req: NextApiRequest, res: NextApiResponse) => {
  const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ':' + process.env.INFURA_API_KEY_SECRET
  ).toString('base64');

  // The chain ID of the supported network
  const chainId = 1;

  let resData = null;

  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    console.log('Suggested gas fees:', data);
    resData = data;
  } catch (error) {
    console.log('Server responded with:', error);
  }

  res.status(200).json({ data: resData });
};

export default Gas;
