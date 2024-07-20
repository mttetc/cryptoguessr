import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { currencyOptions } from '@/consts';
import { Currency } from '@/services/cryptoPrice/types';
import useStore from '@/store';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

const CurrencyDropdown = (props: DropdownMenuProps) => {
  const { selectedCurrency, setSelectedCurrency } = useStore();

  const handleSelectCurrency = (currency: Currency) => () => {
    setSelectedCurrency(currency);
  };

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-auto p-2">
          {selectedCurrency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" defaultValue={selectedCurrency}>
        {currencyOptions.map(currency => (
          <DropdownMenuItem
            key={currency}
            onClick={handleSelectCurrency(currency)}
          >
            {currency}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyDropdown;
