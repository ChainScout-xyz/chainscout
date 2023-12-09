
const Button = ({ onClick, children, variant = "primary", loading = false }: {
  onClick?: any,
  loading?: boolean
  children: React.ReactNode
  variant?: string
}) => {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={` px-5 py-2  rounded-xl  flex items-center 
            ${variant == "primary" ? 'hover:bg-[#111] bg-[#383838] text-white' : ''}
            ${variant == "default" ? ' hover:bg-[#f2f2f2] border text-gray-600 hover:text-[#000] border-gray-200 shadow-sm' : ''}
            
            `}
      style={{
        boxShadow: variant == "primary" ? 'rgb(73, 73, 73) 0px -2.4px 0px 0px inset, rgba(40, 40, 40, 0.2) 0px 1px 3px 0px, rgb(45, 45, 45) 0px 0px 0px 1px' : ''
      }}
    >
      {children}
    </button>
  )
}

export default Button;
