import { ComponentPropsWithoutRef } from 'react';

const Skeleton = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={`flex items-center gap-2 animate-pulse ${className}`}
      {...restProps}
    >
      <div className="w-24 h-9 bg-primary rounded-md" />
    </div>
  );
};

export default Skeleton;
