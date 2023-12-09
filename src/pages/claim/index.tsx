import Button from '@/components/UI/Button';
import CardWrapper from '@/components/UI/CardWrapper';
import ContainerWrapper from '@/components/UI/ContainerWrapper';
import { sendMessages } from '@/utils/waku';
import { MagicWandIcon } from '@radix-ui/react-icons';
import { useAnonAadhaar } from 'anon-aadhaar-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { toast } from 'sonner';


import RewardCard from "@/components/shared/RewardCard";
import useMetamask from "@/hooks/useMetamask";
import { shortenAddress } from "@/utils";

const Confetti = dynamic(
    () => import('react-confetti'),
    { ssr: false }
);

const PageLayout = dynamic(
    () => import('@/components/UI/PageLayout'), {
    ssr: false
}
)

const ClaimPage = ({ node }: any) => {
    const [claimResponse, setClaimResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [allowed, setAllowedStatus] = useState(false);
    const [rewardClaimed, setRewardClaimed] = useState(false);
    const [anonAadhaar] = useAnonAadhaar();
    const { width, height } = useWindowSize();
    const { connect, disconnect, account, connected, provider, chainId } =
        useMetamask();
    const [gas, setGas] = useState(null);

    useEffect(() => {

        console.log('Anon Aadhaar status: ', anonAadhaar.status);
        (async function call() {
            const response = await fetch('/api/integration/gas');
            const data = await response.json();
            setGas(data);
            console.log(gas)
        })();
    }, [anonAadhaar]);

    async function sendWakuMessage() {
        console.log('calling sendMessage');
        await sendMessages(node, {
            message: '0xE956F831Db3ccad88836162b491BCb733117faac|true',
            timestamp: new Date(),
        });
        console.log('sent message');
    }

    const verifyUserAction = async () => {
        setLoading(true);
        toast('Hodl! It will take sometime to verify the task!');

        try {
            const response = await fetch('/api/integration/1inch_filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wallet_address: account,
                }),
            });

            const data = await response.json();

            setClaimResponse(data);
            console.log(data);

            if (data.success == false) {
                toast.error(
                    'You have not completed the required actions to claim the reward.'
                );
            }

            setAllowedStatus(data.success);
            setLoading(false);
            console.log(gas.data.estimatedBaseFee)

        } catch (e) {
            console.log(e);
        }
    };

    const claimReward = async () => {

        setLoading(true);
        toast("Hodl! It will take sometime to verify the task!")

        try {
            const response = await fetch('/api/integration/claim_reward', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wallet_address: account,
                }),
            });

            const data = await response.json();

            toast("Reward Claimed.")

        }
        catch (e) {
            console.log(e)
        }
    }

    console.log(provider)

    return (
        <>
            <Confetti
                width={width}
                numberOfPieces={rewardClaimed ? 500 : 0}
                onConfettiComplete={() => setRewardClaimed(true)}
                height={height}
            />

            <ContainerWrapper>
                <main className={` min-h-screen`}>
                    <PageLayout title='Claim Reward from 1 inch swap campaign' />

                    <CardWrapper title=''>
                        <div className="grid place-items-center">
                            <div className="space-y-5 w-1/2 grid place-items-center">

                                {account ? <>

                                    {!allowed ? <>

                                        <div className="grid grid-cols-2 gap-5">

                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgU658mZEWOGRVwm8rgvodjL_V_Mh7_abSq0cvj5leg&s" alt=""
                                                className="rounded-md"
                                            />

                                            <div>
                                                <h2 className='text-xl font-bold'>Swap on 1inch</h2>


                                                <p>
                                                    Make at least 1 Swap on 1inch and claim your reward!
                                                </p>

                                                <div className="flex items-center space-x-5 mt-10">
                                                    <a href="https://app.1inch.io//#/1/unified/swap/ETH/DAI"
                                                        target='_BLANK'
                                                        className='text-blue-500 hover:text-blue-900'
                                                        rel="noopener noreferrer"
                                                    >
                                                        Swap on 1inch
                                                    </a>

                                                    <Button
                                                        loading={loading}
                                                        onClick={async () => {
                                                            await verifyUserAction();
                                                        }}>
                                                        <MagicWandIcon className="mr-2" />
                                                        {loading ? 'Loading...' : 'Verify'}
                                                    </Button>
                                                </div>

                                            </div>


                                        </div>



                                    </> : <>

                                        <h2 className='text-xl font-bold'>You got the reward 🎉</h2>

                                        <p>
                                            Thank you for participating in the 1 inch swap campaign.
                                        </p>
                                        <p>
                                            You have earned 0.1 ETH.
                                        </p>
                                        {/* @ts-ignore */}
                                        <p>⛽ You{`'`}ve saved ${gas?.data?.high.suggestedMaxFeePerGas * 2358.54 / 10000} in Gas Fees</p>



                                        {/* <LogInWithAnonAadhaar />

                                        <p>{anonAadhaar?.status}</p> */}
                                        {rewardClaimed ? <>
                                            <p>Congrats! You have claimed the reward!!!</p>

                                            {claimResponse ?
                                                <p>
                                                    {claimResponse?.response ? <>
                                                        TxHash: {claimResponse?.response}
                                                    </> : null}
                                                </p>
                                                : null}

                                        </> :
                                            <Button onClick={async () => {
                                                await claimReward()
                                                setRewardClaimed(true);
                                            }}>

                                                <MagicWandIcon className="mr-2" />
                                                {loading ? 'Loading...' : 'Claim'}
                                            </Button>
                                        }
                                    </>}

                                    {account ?
                                        <div className="flex items-center space-x-5">

                                            <p>
                                                {account ? <>{shortenAddress(account)}</> : null}
                                            </p>

                                            <a className='cursor-pointer text-gray-500 hover:text-gray-900' onClick={disconnect}>Disconnect</a>
                                        </div> : null
                                    }

                                </> : <>
                                    <h2 className='text-xl font-bold'>Connect Your Wallet</h2>

                                    <p>
                                        Connect your account & verify to claim the reward!
                                    </p>

                                    <Button onClick={connect}>Connect</Button></>}


                            </div>
                        </div>
                    </CardWrapper>

                    <div className='grid grid-cols-3 gap-10 mt-10'>
                        <RewardCard
                            title='Be active on Lens'
                            description='Follow more than 10 people on Lens and get 10 USDC'
                            amount='10 USDC'
                        />
                        <RewardCard
                            title='1 Swap on Uniswap'
                            description='Swap one time on Uniswap and get 0.001 ETH reward'
                            amount='0.001 ETH'
                        />
                        <RewardCard
                            title='Borrow 10 USDC on Aave'
                            description='Borrow 10 USDC on Aave and get 10 USDC reward'
                            amount='10 USDC'
                        />
                    </div>
                </main>
            </ContainerWrapper>
        </>
    )
};

export default ClaimPage;
