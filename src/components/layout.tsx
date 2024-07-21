import { ComponentPropsWithoutRef } from 'react';
import Header from '@/components/header';

const Layout = ({
  children,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className="flex flex-col h-screen bg-background text-foreground"
      {...restProps}
    >
      <Header />
      <div className="flex-1 flex justify-center">{children}</div>
    </div>
  );
};

export default Layout;
