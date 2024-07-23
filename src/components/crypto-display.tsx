import { CRYPTO_ICONS_MAPPING } from '@/consts';
import { formatCurrency } from '@/helpers';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import useStore from '@/store';
import { ComponentPropsWithoutRef } from 'react';
import Skeleton from './skeleton';

const CryptoDisplay = (props: ComponentPropsWithoutRef<'div'>) => {
  const { selectedCrypto, selectedCurrency } = useStore();
  const { data: cryptoPrice = 0, isLoading } = useReadCryptoPrice({
    params: { crypto: selectedCrypto, currency: selectedCurrency },
  });

  const IconComponent = CRYPTO_ICONS_MAPPING[selectedCrypto];
  const formattedPrice = formatCurrency(cryptoPrice, selectedCurrency);

  return (
    <div className="flex items-center gap-2" {...props}>
      <IconComponent className="w-8 h-8 text-[#F7931A]" />
      {isLoading ? (
        <Skeleton />
      ) : (
        <span className="text-3xl title text-primary">{formattedPrice}</span>
      )}
    </div>
  );
};

export default CryptoDisplay;
