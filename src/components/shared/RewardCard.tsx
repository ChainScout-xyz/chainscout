import { MagicWandIcon } from '@radix-ui/react-icons'
import Button from '../UI/Button'

const RewardCard = ({
    title,
    description,
    amount
}: {
    title?: string
    description?: string
    amount?: string
}) => {
    return (
        <div className='space-y-5 shadow-xs border border-gray-100 hover:shadow-sm rounded-xl p-5' style={{
            background: "linear-gradient(rgb(240, 250, 246) 0%, rgb(255, 255, 255) 68.8196%)"
        }}>
            <h4 className='text-xl font-medium'>{title}</h4>
            <p>
                {description}
            </p>
            <p>
                {amount}
            </p>
            <Button variant='default'>
                <MagicWandIcon className="mr-2" />
                Claim
            </Button>
        </div>
    )
}

export default RewardCard
