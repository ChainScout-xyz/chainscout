import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import ContainerWrapper from '@/components/UI/ContainerWrapper';
import PageLayout from '@/components/UI/PageLayout';
import { CardStackIcon, KeyboardIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons';
import { Select } from '@radix-ui/themes';
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
    <ContainerWrapper>

      <main className={` min-h-screen`}>
        <PageLayout title='Analyze onchain transaction and find “Lookalike” audience' />

        <div className='bg-[#272727] rounded-2xl p-3 pl-28'>
          <div className='mx-auto max-w-5xl grid grid-cols-3 gap-5 m-10 pt-7 pb-8 place-items-center mb-[80px]'>
            <FeatureCard
              icon={<CardStackIcon className='w-10 h-10 mb-2' />}
              title='Select on-chain action to analyze'
              description='Analyze on-chain transactions and find your target audience'
            />
            <FeatureCard
              icon={<TargetIcon className='w-10 h-10 mb-2' />}
              title='Filter target data'
              description='Filter the analyzed target audience by setting mandatory requirements'
            />
            <FeatureCard
              icon={<KeyboardIcon className='w-10 h-10 mb-2' />}
              title='Create Campaign'
              description='Configure the ad campaign and select communication method to reach your target audience'
            />
            <FeatureCard
              icon={<RocketIcon className='w-10 h-10 mb-2' />}
              title='Reward your users'
              description="Set claimable rewards for users' interaction post campaign completion"
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

              <Select.Root defaultValue='dai_transfer' size={'3'}>
                <Select.Trigger className='select_input' />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Token</Select.Label>
                    <Select.Item value='dai_transfer'>DAI Transfer</Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>dApps</Select.Label>
                    <Select.Item value='dapps'>1inch</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </form>
          </div>

          <div className='grid place-items-center'>
            <Button
              onClick={() => {
                router.push('/create');
              }}
            >
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
    </ContainerWrapper>

  );
}
