import CryptoDropdown from '@/components/crypto-dropdown';
import CurrencyDropdown from '@/components/currency-dropdown';
import ModeToggle from '@/components/mode-toggle';
import { Binance } from 'cryptocons';

const Header = () => {
  return (
    <div className="border-b border-secondary sticky top-0 left-0 right-0 flex gap-1 justify-between items-center  py-2 px-4">
      <div className="flex gap-2 items-center">
        <Binance />
        <h1 className="text-lg text-secondary-foreground">Crypto Guessr</h1>
      </div>
      <div className="flex gap-2">
        <CryptoDropdown />
        <CurrencyDropdown />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
