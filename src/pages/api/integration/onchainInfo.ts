import { fetchQuery, init } from '@airstack/node';
import { NextApiRequest, NextApiResponse } from 'next';

const OnChainInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  init(process.env.AIRSTACK_API_KEY!);

  const walletAddress = '0xFf8C547027A357b94c25e1754dD21f0c7f68FD14';
  const crypto = [];
  const nfts = [];

  const variables = {
    address: walletAddress,
  };

  const { data, error } = await fetchQuery(
    `query tokens($address: Identity!) {
  erc20: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC20]}}, limit: 10, blockchain: ethereum}
  ) {
    data:TokenBalance {
      amount
      formattedAmount
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
    }
  }
  erc721: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC721]}, tokenAddress: {_nin: ["0x22C1f6050E56d2876009903609a2cC3fEf83B415"]}}, limit: 10, blockchain: ethereum}
  ) {
    data:TokenBalance {
      amount
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        tokenId
        metaData {
          name
        }
        contentValue {
          image {
            medium
            extraSmall
            large
            original
            small
          }
        }
      }
    }
  }
  poap: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenAddress: {_eq: "0x22C1f6050E56d2876009903609a2cC3fEf83B415"}}, limit: 10, blockchain: ethereum}
  ) {
    data:TokenBalance {
      amount
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        metaData {
          name
        }
        tokenURI
      }
    }
  }
}`,
    variables
  );

  console.log(data);
  console.log(error);

  if (data) {
    for (const erc20 of data.erc20.data) {
      crypto.push(erc20);
    }
    for (const erc721 of data.erc721.data) {
      nfts.push(erc721);
    }
  }

  console.log(crypto);
  console.log(nfts);

  res.status(200).json({ crypto: crypto, nfts: nfts });
};

export default OnChainInfo;
