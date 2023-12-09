import { calculatePercentage } from "@/utils"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import AdvancedFilter from "../Modal/AdvancedFilter"

const FilterCampaign = ({
    walletAddressToFilter,
    onApplyFilter,
    api_path,
    message
}: {
    walletAddressToFilter: string[],
    onApplyFilter: (address: string[]) => void
    api_path: string
    message: string
}) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false)
    const [filteredResults, setFilteredResults] = useState([])
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(`/api/integration/${api_path}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ walletAddress: walletAddressToFilter }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setFilteredResults(data.filtered_address || []);

                setPercentage(calculatePercentage(walletAddressToFilter, filteredResults));

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [walletAddressToFilter]);

    const ApplyFilter = () => {
        onApplyFilter(filteredResults)
        setSelected(true);
    }



    return (
        <section className="relative">

            <div onClick={ApplyFilter} className='p-3 bg-gray-50 border rounded-lg cursor-pointer h-24 grid place-items-center'
                style={{
                    background: selected ? "linear-gradient(rgb(240, 250, 246) 0%, rgb(255, 255, 255) 68.8196%)" : ''
                }}
            >
                {loading ? <>
                    <img src="/loader.svg" alt="loader" className="w-10 h-10 mb-2" />
                    Loading...
                </> : <>
                    {selected ? <CheckCircledIcon className="text-green-500 w-4 h-4 mb-2 absolute top-2 right-[12px]" /> : null}

                    <p>{percentage}% {message}</p>
                </>}
            </div>
            <AdvancedFilter />

        </section>

    )
}

export default FilterCampaign
