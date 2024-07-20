import { CRYPTO_ICONS_MAPPING } from '@/consts';
import { formatCurrency } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';

const CryptoDisplay = () => {
  const { selectedCrypto, selectedCurrency } = useStore();
  const { data: cryptoPrice, isLoading } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  if (isLoading) return 'Fetching...';

  const IconComponent = CRYPTO_ICONS_MAPPING[selectedCrypto];
  const formattedPrice = formatCurrency(Number(cryptoPrice), selectedCurrency);

  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="w-8 h-8 text-[#F7931A]" />
      <span className="text-3xl font-medium text-white font-['Playfair_Display', 'serif']">
        {formattedPrice}
      </span>
    </div>
  );
};

export default CryptoDisplay;
