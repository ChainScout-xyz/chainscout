import { fetchQuery, init } from '@airstack/node';
import { NextApiRequest, NextApiResponse } from 'next';

const NftAddresses = async (req: NextApiRequest, res: NextApiResponse) => {
  init(process.env.AIRSTACK_API_KEY!);

  const walletAddress = ['0xf1996154C34e3dc77b26437a102231785e9aD7fE'];
  const addressesFound = [];

  const variables = {
    _in: walletAddress,
  };

  const { data, error } = await fetchQuery(
    `
        query MyQuery {
  TokenBalances(
    input: {filter: {tokenAddress: {_eq: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      owner {
        addresses
      }
    }
  }
}`,
    variables
  );

  if (data.TokenBalances.TokenBalance) {
    for (const userAddress of data.TokenBalances.TokenBalance) {
      addressesFound.push(userAddress['owner']['addresses'][0]);
    }
  }

  console.log(addressesFound);

  res.status(200).json({ filtered_address: addressesFound });
};

export default NftAddresses;
