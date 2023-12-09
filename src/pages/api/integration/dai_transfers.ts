import { fetchQuery, init } from '@airstack/node';
import { NextApiRequest, NextApiResponse } from 'next';

const DaiTranfers = async (req: NextApiRequest, res: NextApiResponse) => {
  init(process.env.AIRSTACK_API_KEY!);

  const addressesFound = [];

  const variables = {};

  const { data, error } = await fetchQuery(
    `
query GetLast10DaiTokenTransfers {
  TokenTransfers(
    input: {
      filter: {tokenAddress: {_eq: "0x6B175474E89094C44Da98b954EedeAC495271d0F"}},
      blockchain: ethereum,
      limit: 10,
      order: [{blockTimestamp: DESC}]
    }
  ) {
    TokenTransfer {
      amount
      blockNumber
      blockTimestamp
      from {
        addresses
      }
      to {
        addresses
      }
      tokenAddress
      transactionHash
    }
  }
}`,
    variables
  );

  if (data.TokenTransfers.TokenTransfer) {
    for (const userAddress of data.TokenTransfers.TokenTransfer) {
      addressesFound.push({
        amount: userAddress['amount'],
        address: userAddress['from']['addresses'][0],
      });
    }
  }


  res.status(200).json({ filtered_address: addressesFound });
};

export default DaiTranfers;
