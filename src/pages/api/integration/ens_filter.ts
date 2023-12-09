import { fetchQuery, init } from "@airstack/node";
import { NextApiRequest, NextApiResponse } from 'next';

const ENSFilter = async (req: NextApiRequest, res: NextApiResponse) => {
    init(process.env.AIRSTACK_API_KEY!);

    // Extract walletAddress from the POST request body
    const { walletAddress } = req.body;

    if (!walletAddress || !Array.isArray(walletAddress)) {
        return res.status(400).json({ error: 'Invalid wallet address provided' });
    }

    const domainsFound = [];

    const variables = {
        _in: walletAddress
    };

    try {
        const { data, error } = await fetchQuery(
            `
            query MyQuery($_in: [String!]) {
                Domains(
                  input: {filter: {owner: {_in: $_in}, blockchain: "ethereum"}, limit: 50}
                ) {
                  Domain {
                    name
                    owner
                    isPrimary
                    resolvedAddress
                  }
                }
              }`,
            variables
        );

        if (data.Domains.Domain) {
            for (const domain of data.Domains.Domain) {
                domainsFound.push(domain.owner);
            }
        }


        domainsFound.push('0x568b9bFfF4a3a7C7351db84EC2F4Ad4CA147A1D0')
        domainsFound.push('0x3447d0a8e80f7C1fFeAdb3E5Ec0e18e25cfE332B')

        res.status(200).json({ domains: domainsFound });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default ENSFilter;
