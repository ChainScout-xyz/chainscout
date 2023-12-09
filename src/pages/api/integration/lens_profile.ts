import { fetchQuery, init } from "@airstack/node";
import { NextApiRequest, NextApiResponse } from 'next';

const LensProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  init(process.env.AIRSTACK_API_KEY!);

  const { walletAddress } = req.body;

  const lensFound = [];

  const variables = {
    _in: walletAddress
  };

  const { data, error } = await fetchQuery(
    `
        query MyQuery($_in: [Address!]) {
            Socials(
              input: {filter: {userAssociatedAddresses: {_in: $_in},  dappName: {_eq: lens}}, blockchain: ethereum}
            ) {
              Social {
                userAssociatedAddresses
                dappName
              }
            }
          }`,
    variables
  );


  if (data.Socials.Social) {
    for (const userSocial of data.Socials.Social) {
      lensFound.push(userSocial.userAssociatedAddresses[0])
    }
  }


  res.status(200).json({ filtered_address: lensFound })
}

export default LensProfile;