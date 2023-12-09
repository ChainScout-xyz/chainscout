import { calculatePercentage } from "@/utils"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import AdvancedFilter from "../Modal/AdvancedFilter"

const FilterCampaign = ({
    label,
    walletAddressToFilter,
    onApplyFilter,
    api_path,
    message
}: {
    label: string,
    walletAddressToFilter: string[],
    onApplyFilter: (address: string[]) => void
    api_path: string
    message: string
}) => {

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false)
    const [filteredResults, setFilteredResults] = useState([])
    const [percentage, setPercentage] = useState("0")

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (walletAddressToFilter.length === 0) { }
                else {
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

                    setPercentage(calculatePercentage(walletAddressToFilter, data.filtered_address));
                }

            } catch (error) {
                // console.error('Error fetching data:', error);
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
        <section className="relative filter_card">
            <div onClick={ApplyFilter} className='p-3 bg-gray-50 border rounded-lg cursor-pointer h-[113px] grid place-items-center'
                style={{
                    background: selected ? "linear-gradient(rgb(240, 250, 246) 0%, rgb(255, 255, 255) 68.8196%)" : ""
                }}
            >
                <p className="w-full text-left text-gray-700 font-medium">{label}</p>

                {loading ? <>
                    <div className="flex items-center">
                        <img src="/loader.svg" alt="" className="w-5 h-5 mr-1" />
                        Loading...
                    </div>
                </> : <>
                    {selected ? <CheckCircledIcon className="text-green-500 w-4 h-4 mb-2 absolute top-2 right-[12px]" /> : null}

                    <p>{percentage}% {message}</p>
                </>}

                {api_path === "lens_profile" ? <svg style={{ opacity: 0.3 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 80" fill="none" className="text-paleSunflower w-20 absolute bottom-6 right-0"><path className="green_face" style={{ opacity: 0.3 }} fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4.641" d="M84.228 25.62a.732.732 0 0 1-1.263-.527c0-.622 0-1.306-.03-1.953-.735-26.853-40.93-26.853-41.665 0a74.725 74.725 0 0 0-.026 1.953c0 .657-.798.99-1.263.527-.456-.455-.93-.919-1.394-1.361C19.19 5.794-9.213 34.434 9.123 53.919c.445.472.897.94 1.356 1.405C32.602 77.597 62.097 77.6 62.103 77.6c.005 0 29.504-.002 51.628-22.276.462-.463.914-.93 1.356-1.404 18.336-19.508-10.085-48.126-29.464-29.661a42.22 42.22 0 0 0-1.395 1.361Z"></path><path fill="#383F3A" fillRule="evenodd" d="M79.191 45.803c-.622 0-.838.905-.44 1.384a4.896 4.896 0 0 1 1.125 3.133c0 2.704-2.177 4.896-4.863 4.896-2.686 0-4.863-2.192-4.863-4.896 0-.145-.187-.217-.272-.1-.767 1.061-1.285 2.252-1.497 3.502-.12.704-.689 1.287-1.403 1.287h-.394c-.932 0-1.701-.76-1.564-1.682.944-6.318 7.127-10.9 14.171-10.9 7.043 0 13.227 4.582 14.17 10.9.138.921-.63 1.682-1.563 1.682-.932 0-1.67-.764-1.873-1.674-.922-4.141-5.195-7.532-10.734-7.532ZM36.009 50.32c0-.19-.246-.293-.361-.141-.82 1.077-1.38 2.296-1.616 3.582-.14.76-.753 1.39-1.525 1.39h-.29c-.931 0-1.7-.76-1.563-1.682.943-6.32 7.127-10.899 14.17-10.899 7.044 0 13.229 4.578 14.171 10.9.138.92-.631 1.682-1.563 1.682-.932 0-1.67-.765-1.873-1.675-.921-4.143-5.195-7.531-10.734-7.531-.504 0-.688.711-.351 1.085a4.897 4.897 0 0 1 1.26 3.289c0 2.704-2.177 4.896-4.863 4.896-2.685 0-4.862-2.192-4.862-4.896Zm33.998 11.274c-.818-.447-1.836-.127-2.495.533-1.27 1.27-3.195 2.14-5.423 2.14-2.233 0-4.156-.86-5.423-2.132-.658-.66-1.675-.985-2.494-.541-.82.444-1.134 1.48-.546 2.204 1.922 2.37 5.037 3.843 8.463 3.843 3.428 0 6.537-1.49 8.457-3.84.589-.723.279-1.76-.54-2.207Z" clipRule="evenodd"></path></svg>
                    : null}

                {api_path === "ens_filter" ?
                    <img
                        style={{
                            position: "absolute",
                        }}
                        src="ens.svg" className="w-14 absolute bottom-[10px] h-14 relative right-0 gray_scale" />
                    : null}

                {api_path === "farcaster" ?
                    <img
                        style={{
                            position: "absolute",
                        }}
                        src="farcaster.png" className="w-14 absolute bottom-[20px] h-14 relative right-0 gray_scale" />
                    : null}
            </div>
            <AdvancedFilter />

        </section>

    )
}

export default FilterCampaign
