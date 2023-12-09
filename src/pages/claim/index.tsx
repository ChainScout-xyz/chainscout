import Button from "@/components/UI/Button"
import CardWrapper from "@/components/UI/CardWrapper"
import ContainerWrapper from "@/components/UI/ContainerWrapper"
import PageLayout from "@/components/UI/PageLayout"
import RewardCard from "@/components/shared/RewardCard"
import { MagicWandIcon } from "@radix-ui/react-icons"
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import useWindowSize from 'react-use/lib/useWindowSize'

const Confetti = dynamic(
    () => import('react-confetti'),
    { ssr: false }
);


const ClaimPage = () => {
    const [loading, setLoading] = useState(false)
    const [allowed, setAllowedStatus] = useState(false)
    const [rewardClaimed, setRewardClaimed] = useState(false);
    const [anonAadhaar] = useAnonAadhaar();
    const { width, height } = useWindowSize();

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }, [anonAadhaar]);

    const verifyUserAction = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/integration/1inch_filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wallet_address: '0xaD26A4E7ef85EDccD48451B64029B8082ffDeF18',
                }),
            });

            const data = await response.json();

            setAllowedStatus(data.status)
            setLoading(false);

        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Confetti
                width={width}
                numberOfPieces={rewardClaimed ? 500 : 0}
                onConfettiComplete={() => setRewardClaimed(true)}
                height={height}
            />

            <ContainerWrapper>
                <main
                    className={` min-h-screen`}
                >

                    <PageLayout
                        title='Claim Reward from 1 inch swap campaign'
                    />

                    <CardWrapper title=''>
                        <div className="grid place-items-center">
                            <div className="space-y-5 w-1/2 grid place-items-center">

                                <h2 className='text-xl font-bold'>Verify your actions</h2>

                                <p>
                                    You have to verify your actions to claim the reward.
                                </p>

                                <Button
                                    loading={loading}
                                    onClick={async () => {
                                        await verifyUserAction();
                                    }}>
                                    <MagicWandIcon className="mr-2" />
                                    Verify
                                </Button>


                                <h2 className='text-xl font-bold'>You got the reward 🎉</h2>

                                <p>
                                    Thank you for participating in the 1 inch swap campaign.
                                </p>
                                <p>
                                    You have earned 0.1 ETH.
                                </p>


                                <LogInWithAnonAadhaar />
                                <p>{anonAadhaar?.status}</p>

                                <Button onClick={() => {
                                    setRewardClaimed(true);
                                }}>
                                    <MagicWandIcon className="mr-2" />
                                    Claim
                                </Button>
                            </div>
                        </div>
                    </CardWrapper>

                    <h5 className="text-2xl text-center mt-10 font-medium">
                        Other Rewards you can get
                    </h5>

                    <div className="grid grid-cols-3 gap-10 mt-10">
                        <RewardCard
                            title="Be active on Lens"
                            description="Follow more than 10 people on Lens and get 10 USDC"
                            amount="10 USDC"
                        />
                        <RewardCard
                            title="1 Swap on Uniswap"
                            description="Swap one time on Uniswap and get 0.001 ETH reward"
                            amount="0.001 ETH"
                        />
                        <RewardCard
                            title="Borrow 10 USDC on Aave"
                            description="Borrow 10 USDC on Aave and get 10 USDC reward"
                            amount="10 USDC"
                        />
                    </div>

                </main>
            </ContainerWrapper>
        </>
    )
}

export default ClaimPage
