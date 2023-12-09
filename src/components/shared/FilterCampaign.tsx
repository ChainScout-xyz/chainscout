import { CheckCircledIcon } from "@radix-ui/react-icons"

const FilterCampaign = () => {
    return (

        <div className='p-3 mr-2 bg-gray-50 border rounded-lg flex flex-col items-end'>
            <CheckCircledIcon className="text-green-500 w-4 h-4 mb-2" />

            <p>60% of users with this action have more than 2 ENS</p>
        </div>

    )
}

export default FilterCampaign
