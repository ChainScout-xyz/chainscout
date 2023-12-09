import React from 'react'

const ContainerWrapper = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="mx-auto max-w-screen-xl px-1 md:px-4 sm:px-6 relative">
            {children}
        </div>
    )
}

export default ContainerWrapper
