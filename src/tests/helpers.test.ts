import { formatCurrency, getNewScore } from '@/helpers';
import { describe, it, expect } from 'vitest';

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

describe('getNewScore', () => {
  it('should increase score by 1 if direction is up and updatedPrice is greater than price', () => {
    const result = getNewScore({
      direction: 'up',
      updatedPrice: 110,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(6);
  });

  it('should decrease score by 1 if direction is up but updatedPrice is not greater than price', () => {
    const result = getNewScore({
      direction: 'up',
      updatedPrice: 90,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(4);
  });

  it('should increase score by 1 if direction is down and updatedPrice is less than price', () => {
    const result = getNewScore({
      direction: 'down',
      updatedPrice: 90,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(6);
  });

  it('should decrease score by 1 if direction is down but updatedPrice is not less than price', () => {
    const result = getNewScore({
      direction: 'down',
      updatedPrice: 110,
      price: 100,
      currentScore: 5,
    });
    expect(result).toBe(4);
  });

  it('should not allow the score to go below 0', () => {
    const result = getNewScore({
      direction: 'up',
      updatedPrice: 90,
      price: 100,
      currentScore: 0,
    });
    expect(result).toBe(0);
  });
});
