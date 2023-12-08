import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import PageLayout from '@/components/UI/PageLayout';
import { CardStackIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons';
import { Select } from '@radix-ui/themes';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const FeatureCard = ({
  title,
  description,
  icon
}: {
  title?: string,
  description?: string,
  icon?: React.ReactNode

}) => {
  return <div>
    {icon}
    <h4 className="text-xl font-medium text-[#fff] mt-5">{title}</h4>
    <p className='font-medium text-[#787878] w-3/4'>
      {description}
    </p>
  </div>
}

export default function Home() {
  return (
    <main
      className={` min-h-screen`}
    >
      <PageLayout
        title='Analyze onchain transaction and find “Lookalike” audience'
      />


      <div className="bg-[#272727]  rounded-2xl p-3">
        <div className="grid grid-cols-3 gap-5 m-10 pt-10 pb-8 place-items-center mb-[80px]">
          <FeatureCard
            icon={<CardStackIcon className='w-10 h-10 mb-2' />}
            title="Choose Action"
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
          <FeatureCard
            icon={<TargetIcon className='w-10 h-10 mb-2' />}
            title="Create Campaign"
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
          <FeatureCard
            icon={<RocketIcon className='w-10 h-10 mb-2' />}
            title="Boom! Done"
            description='Analyze onchain transaction and find “Lookalike” audience'
          />
        </div>
      </div>

      <CardWrapper className='relative top-[-120px] m-10' title='Select On-Chain Action'>
        <div className="my-5">
          <form>

            <label htmlFor="" className='mb-2 block'>
              Select Action
            </label>
            <div>
              <Select.Root size={'3'} defaultValue="1inch">
                <Select.Trigger />
                <Select.Content className='w-full'>
                  <Select.Group>
                    <Select.Label>Swap</Select.Label>
                    <Select.Item value="1inch">1inch - Swap</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>



          </form>
        </div>

        <div className="grid place-items-center">
          <Button>
            Next
          </Button>
        </div>
      </CardWrapper>
    </main>
  )
}
