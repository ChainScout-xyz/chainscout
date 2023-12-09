import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const LensProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  let roomId = null;

  const response = await axios.post(
    'https://api.huddle01.com/api/v1/create-room',
    {
      title: 'Chain Scout',
      hostWallets: ['0xf1996154C34e3dc77b26437a102231785e9aD7fE'],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.HUDDLE_API_KEY,
      },
    }
  );

  console.log(response.data.data.roomId);
  console.log(response.data);

  res.status(200).json({ filtered_address: response.data.meetingLink });
};

export default LensProfile;
