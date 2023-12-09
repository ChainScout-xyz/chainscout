import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import PageLayout from '@/components/UI/PageLayout';
import FilterCampaign from '@/components/shared/FilterCampaign';
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

const Create = () => {
  const [message, setMessage] = useState<string>('');
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [walletAddressToFilter, setWalletAddressToFilter] = useState<string[]>(
    []
  );
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  useEffect(() => {
    (async function handler() {
      setDataLoading(true);
      const response = await fetch('/api/integration/dai_transfers');
      const data = await response.json();
      setApiResponse(data.filtered_address);
      const walletList = data.filtered_address?.map(
        (item: any) => item.address
      );
      setWalletAddressToFilter(walletList);
      setDataLoading(false);
    })();
  }, []);

  const sendXMTPMessage = async () => {
    try {
      const response = await fetch('/api/integration/xmtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: [
            '0xCbE80A330F5221ac28392933BdeE65f1F2dAb834',
            '0xaD26A4E7ef85EDccD48451B64029B8082ffDeF18'
          ],
          message: `${message} 
Claim Reward: ${'https://chainscout.xyz/claim'}`,
        }),
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <PageLayout title='Analyze onchain transaction and find “Lookalike” audience' />
      <div className='max-w-5xl mx-auto pb-20'>
        <CardWrapper>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl font-bold mb-5'>Create a Campaign</p>

            <form className='w-[600px]'>
              <div className='pt-10'>
                <label htmlFor='' className='mb-2 block text-black font-bold'>
                  1. Select On-Chain Action to Analyze
                </label>
                <div className='w-full'>
                  <Select.Root size={'3'} defaultValue='dai_transfer'>
                    <Select.Trigger className='select_input' />
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Token</Select.Label>
                        <Select.Item value='dai_transfer'>
                          DAI Transfer
                        </Select.Item>
                      </Select.Group>
                      <Select.Separator />
                      <Select.Group>
                        <Select.Label>dApps</Select.Label>
                        <Select.Item value='dapps'>1inch</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </div>
                <p className='font-semibold text-sm mt-2 text-black'>
                  Total users with this action:{' '}
                  {walletAddressToFilter.length ?? 0}
                </p>
              </div>
              <div className='bg-gray-50 rounded-lg mt-5 border'>
                {dataLoading ? (
                  <>
                    <div className='flex justify-center items-center p-4 border-b border-gray-200 text-center'>
                      <div className='flex items-center justify-center w-full'>
                        <p className='text-sm font-medium mr-2 flex items-center text-center'>
                          <img
                            src='/loader.svg'
                            alt='loader'
                            className='w-6 h-6'
                          />
                          Loading...
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {apiResponse?.map((item: any) => (
                      <>
                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                          <div className='flex items-center justify-between w-full'>
                            <p className='text-sm font-medium mr-2'>
                              {item.address}
                            </p>
                            <p className='text-sm font-medium flex items-center'>
                              {(item.amount / 10 ** 18).toFixed(3)} DAI
                              <img
                                src='https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
                                alt=''
                                className='w-4 h-4 ml-1'
                              />
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                    <div className='text-center py-1 text-sm'>
                      {walletAddressToFilter.length ?? 50} More records
                    </div>
                  </>
                )}
              </div>
              <div className='pt-7'>
                <label htmlFor='' className='mb-2 block text-black font-bold'>
                  2. Select Targets
                </label>
                <div className='w-full grid grid-cols-2 gap-5'>
                  <FilterCampaign
                    message={'of users with this action have ENS Profile'}
                    api_path=''
                    walletAddressToFilter={walletAddressToFilter}
                    onApplyFilter={(address: string[]) =>
                      setFilteredResults(address)
                    }
                  />
                  <FilterCampaign
                    message={'of users with this action have lens profile'}
                    api_path=''
                    walletAddressToFilter={walletAddressToFilter}
                    onApplyFilter={(address: string[]) =>
                      setFilteredResults(address)
                    }
                  />
                  <FilterCampaign
                    message={'of users with this action have more than 2 ENS'}
                    api_path=''
                    walletAddressToFilter={walletAddressToFilter}
                    onApplyFilter={(address: string[]) =>
                      setFilteredResults(address)
                    }
                  />
                </div>
                <p className='font-semibold text-sm mt-2 text-black'>
                  Total Audience: {filteredResults.length ?? 0}
                </p>
              </div>
              <div className='pt-10'>
                <label htmlFor='' className='mb-2 block text-black font-bold'>
                  3. Campaign Detail
                </label>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Campaign Name{' '}
                  </label>
                  <div className='w-full'>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      required
                    />
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    How to Contact{' '}
                  </label>
                  <div className='w-full flex items-center'>
                    <div className='p-3 border rounded-lg mr-2'>
                      Push Protocol
                    </div>
                    <div className='p-3 border rounded-lg mr-2'>XMTP</div>
                    <div className='p-3 border rounded-lg'>WAKU</div>
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Message{' '}
                  </label>
                  <div className='w-full'>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      required
                    />
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Network{' '}
                  </label>
                  <div className='w-52'>
                    <Select.Root size={'3'} defaultValue='polygon'>
                      <Select.Trigger className='select_input' />
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value='polygon'>Polygon</Select.Item>
                          <Select.Item value='celo'>Celo</Select.Item>
                          <Select.Item value='xdc'>xDC</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Reward Per Wallet{' '}
                  </label>
                  <div className='w-full'>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      required
                    />
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Currency{' '}
                  </label>
                  <div className='w-full'>
                    <Select.Root size={'3'} defaultValue='matic'>
                      <Select.Trigger className='select_input' />
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value='matic'>Matic</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
                <div className='pt-4'>
                  <label
                    htmlFor=''
                    className='mb-2 block text-black font-medium'
                  >
                    Capacity{' '}
                  </label>
                  <div className='w-full'>
                    <input
                      type='text'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      required
                    />
                  </div>
                  <p className='font-semibold text-sm mt-2 text-black'>
                    Total Reward spent : 0 MATIC{' '}
                  </p>
                </div>
              </div>
              <div className='mt-10 w-full flex justify-between items-center'>
                <Button>Run</Button>
              </div>{' '}
            </form>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
};

export default Create;
