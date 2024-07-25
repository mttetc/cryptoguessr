import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster expand={false} richColors toastOptions={{}} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
