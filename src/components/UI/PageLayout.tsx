import Link from "next/link"

const PageLayout = ({ title }: { title?: string }) => {
    return (
        <>
            <div className="mb-10 grid place-items-center">
                <Link href="/" passHref>
                    <img src="/chainscout.svg" alt="" />
                </Link>
                <p className='mx-2 text-xl mt-10 h-20'>
                    {title}
                </p>
            </div>
        </>
    )
}

export default PageLayout
