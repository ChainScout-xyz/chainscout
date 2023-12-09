import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import PageLayout from '@/components/UI/PageLayout';
import { CardStackIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div>
      {icon}
      <h4 className='text-xl font-medium text-[#fff] mt-3'>{title}</h4>
      <p className='font-medium text-[#787878] w-3/4'>{description}</p>
    </div>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <main className={` min-h-screen`}>
      <PageLayout title='Analyze onchain transaction and find “Lookalike” audience' />

      <div className='bg-[#272727] rounded-2xl p-3 pl-28'>
        <div className='mx-auto max-w-5xl grid grid-cols-3 gap-5 m-10 pt-7 pb-8 place-items-center mb-[80px]'>
          <FeatureCard
            icon={<CardStackIcon className='w-10 h-10 mb-2' />}
            title='Choose Action'
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
          <FeatureCard
            icon={<TargetIcon className='w-10 h-10 mb-2' />}
            title='Create Campaign'
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
          <FeatureCard
            icon={<RocketIcon className='w-10 h-10 mb-2' />}
            title='Boom! Done'
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
        </div>
      </div>

      <CardWrapper
        className='relative top-[-110px] w-[800px] mx-auto m-10 flex flex-col justify-center items-center'
        title='Create a Campaign'
      >
        <div className='my-5'>
          <form className='w-96'>
            <label htmlFor='' className='mb-2 block'>
              Select On-Chain Action
            </label>
            <div className='w-full'>
              <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                <option selected>1 inch - Swap</option>
              </select>
            </div>
          </form>
        </div>

        <div className='grid place-items-center'>
          <Button onClick={() => {
            router.push('/create')
          }}>
            Next{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 ml-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </Button>
        </div>
      </CardWrapper>
    </main>
  );
}
