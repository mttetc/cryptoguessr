import CryptoDropdown from '@/components/crypto-dropdown';
import CurrencyDropdown from '@/components/currency-dropdown';
import GuessBox from '@/components/guess-box';
import Layout from '@/components/layout';

const Home = () => {
  return (
    <Layout>
      <div className="absolute left-2 top-2 flex gap-1">
        <CryptoDropdown />
        <CurrencyDropdown />
      </div>
      <GuessBox />
    </Layout>
  );
};

export default Home;
