import GuessBox from '@/components/guess-box';
import Providers from '@/components/providers';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect } from 'vitest';

describe('GuessBox', () => {
  test('should show countdown element when countdown is started', async () => {
    render(
      <Providers>
        <GuessBox />
      </Providers>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('guess-box-button-down'));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('guess-box-countdown')).toBeInTheDocument();
    });
  });
});
