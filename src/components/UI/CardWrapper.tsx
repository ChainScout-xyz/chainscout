import React from 'react';

const CardWrapper = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`bg-white p-8 shadow rounded-lg ${className}`}>
      <h2 className='text-2xl font-bold'>{title}</h2>

      {children}
    </div>
  );
};

export default CardWrapper;
