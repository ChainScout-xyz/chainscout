import Button from "@/components/UI/Button"
import CardWrapper from "@/components/UI/CardWrapper"
import PageLayout from "@/components/UI/PageLayout"
import RewardCard from "@/components/shared/RewardCard"
import { MagicWandIcon } from "@radix-ui/react-icons"
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react"
import { useEffect } from "react"

const ClaimPage = () => {
    const [anonAadhaar] = useAnonAadhaar();

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }, [anonAadhaar]);


    return (
        <main
            className={` min-h-screen`}
        >
            <PageLayout
                title='Claim Reward from 1 inch swap campaign'
            />

            <CardWrapper title=''>
                <div className="grid place-items-center">
                    <div className="space-y-5 w-1/2 grid place-items-center">



                        <h2 className='text-xl font-bold'>You got the reward 🎉</h2>

                        <p>
                            Thank you for participating in the 1 inch swap campaign.
                        </p>
                        <p>
                            You have earned 0.1 ETH.
                        </p>

                        <LogInWithAnonAadhaar />
                        <p>{anonAadhaar?.status}</p>

                        <Button>
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
    )
}

export default ClaimPage
