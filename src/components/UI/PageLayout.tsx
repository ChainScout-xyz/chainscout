
const PageLayout = ({ title }: { title?: string }) => {
    return (
        <>
            <div className="mb-10 grid place-items-center">
                <img src="/logo.png" alt="" className='h-40' />
                <p className='mx-2 text-xl mt-10'>
                    {title}
                </p>
            </div>
        </>
    )
}

export default PageLayout
