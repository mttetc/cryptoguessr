import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cryptoOptions } from '@/consts';
import { Crypto } from '@/services/cryptoPrice/types';
import useStore from '@/store';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

const CryptoDropdown = (props: DropdownMenuProps) => {
  const { selectedCrypto, setSelectedCrypto } = useStore();

  const handleSelectCrypto = (crypto: Crypto) => () => {
    setSelectedCrypto(crypto);
  };

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-auto p-2">
          {selectedCrypto}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" defaultValue={selectedCrypto}>
        {cryptoOptions.map(crypto => (
          <DropdownMenuItem key={crypto} onClick={handleSelectCrypto(crypto)}>
            {crypto}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CryptoDropdown;
