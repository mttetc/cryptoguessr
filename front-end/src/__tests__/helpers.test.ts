import {
  formatCurrency,
  getConfirmationToast,
  getCryptoPrice,
  calculateNewScore,
  invalidateCryptoPrice,
} from '@/helpers';
import { toast } from 'sonner';
import { QueryClient } from '@tanstack/react-query';
import { expect } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    const result = formatCurrency(1000, 'USD', 'en-US');
    expect(result).toBe('$1,000.00');
  });

  it('formats EUR currency correctly using default locale', () => {
    const result = formatCurrency(1000, 'EUR')
      .replace(/\u202F/g, ' ') // Replace narrow no-break spaces with regular spaces
      .replace(/\u00A0/g, ' '); // Replace no-break spaces with regular spaces
    expect(result).toBe('1 000,00 €');
  });

  it('formats JPY currency without decimal places', () => {
    const result = formatCurrency(1000, 'JPY', 'ja-JP');
    expect(result).toBe('￥1,000');
  });
});

describe('calculateNewScore', () => {
  it('should increase score by 1 if direction is up and updatedPrice is greater than price', () => {
    const result = calculateNewScore({
      direction: 'up',
      updatedPrice: 110,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(6);
  });

  it('should decrease score by 1 if direction is up but updatedPrice is not greater than price', () => {
    const result = calculateNewScore({
      direction: 'up',
      updatedPrice: 90,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(4);
  });

  it('should increase score by 1 if direction is down and updatedPrice is less than price', () => {
    const result = calculateNewScore({
      direction: 'down',
      updatedPrice: 90,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(6);
  });

  it('should decrease score by 1 if direction is down but updatedPrice is not less than price', () => {
    const result = calculateNewScore({
      direction: 'down',
      updatedPrice: 110,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(4);
  });

  it('should not allow the score to go below 0', () => {
    const result = calculateNewScore({
      direction: 'up',
      updatedPrice: 90,
      price: 100,
      currentScore: 0,
    });
    expect(result).toBe(0);
  });
});

describe('getConfirmationToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display error toast when previousScore is greater than or equal to newScore', () => {
    getConfirmationToast({ previousScore: 5, newScore: 4 });
    expect(toast.error).toHaveBeenCalledWith('Too bad!', {
      position: 'bottom-center',
      description: "You guessed wrong, but don't worry, you can try again!",
    });
  });

  it('should display success toast when newScore is greater than previousScore', () => {
    getConfirmationToast({ previousScore: 3, newScore: 5 });
    expect(toast.success).toHaveBeenCalledWith('Nice!', {
      position: 'bottom-center',
      description: 'You guessed right, keep it up!',
    });
  });
});

it('calls invalidateQueries with the correct queryKey', async () => {
  const queryClient = new QueryClient();
  const mockInvalidateQueries = vi.fn();
  queryClient.invalidateQueries = mockInvalidateQueries;

  await invalidateCryptoPrice({
    queryClient,
  });

  expect(mockInvalidateQueries).toHaveBeenCalledWith({
    queryKey: ['cryptoPrice', 'list', { crypto: 'BTC', currency: 'USD' }],
  });
});

describe('getCryptoPrice', () => {
  it('should return the price if query data exists', () => {
    const mockQueryClient = new QueryClient();
    const expectedPrice = 50000;

    mockQueryClient.getQueryData = vi.fn().mockReturnValueOnce(expectedPrice);

    const price = getCryptoPrice({
      queryClient: mockQueryClient,
    });

    expect(price).toEqual(expectedPrice);
  });

  it('should return 0 if query data does not exist', () => {
    const mockQueryClient = new QueryClient();

    mockQueryClient.getQueryData = vi.fn().mockReturnValueOnce(undefined);

    const price = getCryptoPrice({
      queryClient: mockQueryClient,
    });

    expect(price).toEqual(0);
  });
});
