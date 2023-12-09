import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import PageLayout from '@/components/UI/PageLayout';
import FilterCampaign from '@/components/shared/FilterCampaign';
import { useState } from 'react';

const walletAddressToFilter = [
  '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
  '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
];

const Create = () => {
  const [filteredResults, setFilteredResults] = useState<string[]>([]);


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
                  <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                    <option selected>1 inch - Swap</option>
                  </select>
                </div>
                <p className='font-semibold text-sm mt-2 text-black'>
                  Total users with this action: {walletAddressToFilter.length ?? 0}
                </p>
              </div>
              <div className='pt-7'>
                <label htmlFor='' className='mb-2 block text-black font-bold'>
                  2. Select Targets
                </label>
                <div className='w-full grid grid-cols-2 gap-5'>
                  <FilterCampaign message={'of users with this action have ENS Profile'} api_path='' walletAddressToFilter={walletAddressToFilter} onApplyFilter={(address: string[]) => setFilteredResults(address)} />
                  <FilterCampaign message={'of users with this action have lens profile'} api_path='' walletAddressToFilter={walletAddressToFilter} onApplyFilter={(address: string[]) => setFilteredResults(address)} />
                  <FilterCampaign message={'of users with this action have more than 2 ENS'} api_path='' walletAddressToFilter={walletAddressToFilter} onApplyFilter={(address: string[]) => setFilteredResults(address)} />
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
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                      <option selected>Polygon</option>
                    </select>
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
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                      <option selected>MATIC</option>
                    </select>
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
                    Total Reward spent : 10,000 MATIC{' '}
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
