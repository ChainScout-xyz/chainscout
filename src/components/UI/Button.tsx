const Button = ({
  onClick,
  children,
}: {
  onClick?: any;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className='bg-[#383838] flex items-center justify-center px-5 py-2 text-md rounded-full hover:bg-[#111] text-white'
      style={{
        boxShadow:
          'rgb(73, 73, 73) 0px -2.4px 0px 0px inset, rgba(40, 40, 40, 0.2) 0px 1px 3px 0px, rgb(45, 45, 45) 0px 0px 0px 1px',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
