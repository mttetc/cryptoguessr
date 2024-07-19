import { Button } from '@/components/ui/button';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BitcoinIcon,
  TrophyIcon,
} from 'lucide-react';

const GuessBox = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1C1F2E] to-[#2D3142]">
      <div className="flex items-center justify-center flex-1">
        <div className="bg-[#2D3142] rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <BitcoinIcon className="w-8 h-8 text-[#F7931A]" />
              <span className="text-3xl font-medium text-white font-['Playfair_Display', 'serif']">
                $45,000
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-medium text-white font-['Playfair_Display', 'serif']">
                42
              </span>
              <TrophyIcon className="w-6 h-6 text-[#7B61FF]" />
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="text-white font-['Playfair_Display', 'serif']">
              Will Bitcoin price go up or down? Take your guess!
            </p>
          </div>
          <div className="flex justify-center space-x-2 mb-6">
            <Button
              variant="outline"
              className="rounded-l-lg border-[#F7931A] text-[#F7931A] hover:bg-[#F7931A] hover:text-white"
            >
              <ArrowUpIcon className="w-5 h-5 mr-2" />
              Up
            </Button>
            <Button
              variant="outline"
              className="rounded-r-lg border-[#7B61FF] text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white"
            >
              <ArrowDownIcon className="w-5 h-5 mr-2" />
              Down
            </Button>
          </div>
          <div className="flex justify-center">Countdown</div>
        </div>
      </div>
    </div>
  );
};

export default GuessBox;
