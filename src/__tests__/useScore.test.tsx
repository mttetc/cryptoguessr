import { getNewScore } from '@/helpers';
import useScore from '@/hooks/useScore';
import { useReadCryptoPrice } from '@/services/cryptoPrice/hooks';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import useStore from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { expect } from 'vitest';

vi.mock('nanoid', () => ({ nanoid: vi.fn(() => 'nanoid') }));
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));
vi.mock('@/services/cryptoPrice/hooks');
vi.mock('@/services/scores/hooks');
vi.mock('@/helpers');

describe('useScore', () => {
  const mockQueryClient = {
    invalidateQueries: vi.fn(),
  };

  const initialStoreState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  const setUpMocks = ({
    cryptoPrice = 100,
    score = 0,
    newScore = 10,
  }: {
    cryptoPrice?: number;
    score?: number;
    newScore?: number;
  }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.mocked(useReadCryptoPrice).mockReturnValue({ data: cryptoPrice });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.mocked(useReadScore).mockReturnValue({ data: { score } });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.mocked(useCreateScore).mockReturnValue({ mutate: vi.fn() });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vi.mocked(useUpdateScore).mockReturnValue({ mutate: vi.fn() });
    vi.mocked(getNewScore).mockResolvedValue(newScore);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new score if no anonymousId is present', async () => {
    setUpMocks({});

    const { result } = renderHook(() => useScore());

    await act(async () => {
      await result.current.onScoreUpdate('up');
    });

    expect(useCreateScore().mutate).toHaveBeenCalledWith({
      id: 'nanoid',
      score: 10,
    });
  });

  it('should update the score if anonymousId is present', async () => {
    setUpMocks({ score: 0, newScore: 10 });

    useStore.setState({ anonymousId: 'testId' });

    const { result } = renderHook(() => useScore());

    await act(async () => {
      await result.current.onScoreUpdate('up');
    });

    expect(useUpdateScore().mutate).toHaveBeenCalledWith({
      id: 'testId',
      score: 10,
    });
  });

  it('should not update the score if new score is the same as the current score', async () => {
    setUpMocks({ score: 10, newScore: 10 });

    const { result } = renderHook(() => useScore());

    await act(async () => {
      await result.current.onScoreUpdate('up');
    });

    expect(useUpdateScore().mutate).not.toHaveBeenCalled();
    expect(useCreateScore().mutate).not.toHaveBeenCalled();
  });
});
