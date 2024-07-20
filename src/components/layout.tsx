import { ComponentPropsWithoutRef } from 'react';
import ModeToggle from '@/components/mode-toggle';

const Layout = ({
  children,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#1C1F2E] to-[#2D3142]"
      {...restProps}
    >
      <div className="absolute right-2 top-2">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
};

export default Layout;
