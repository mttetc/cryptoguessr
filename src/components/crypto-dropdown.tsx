import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CRYPTO_ICONS_MAPPING, cryptoOptions } from '@/consts';
import { Crypto } from '@/services/cryptoPrice/types';
import useStore from '@/store';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

const CryptoDropdown = (props: DropdownMenuProps) => {
  const selectedCrypto = useStore(state => state.selectedCrypto);
  const setSelectedCrypto = useStore(state => state.setSelectedCrypto);

  const handleSelectCrypto = (crypto: Crypto) => () => {
    setSelectedCrypto(crypto);
  };

  const SelectedCryptoIcon = CRYPTO_ICONS_MAPPING[selectedCrypto];

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-auto p-2 gap-1">
          <SelectedCryptoIcon />
          {selectedCrypto}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" defaultValue={selectedCrypto}>
        {cryptoOptions.map(crypto => {
          const IconComponent = CRYPTO_ICONS_MAPPING[crypto];
          return (
            <DropdownMenuItem
              key={crypto}
              onClick={handleSelectCrypto(crypto)}
              className="gap-1"
            >
              <IconComponent />
              {crypto}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CryptoDropdown;
