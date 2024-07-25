import useScore from '@/hooks/useScore';
import {
  useCreateScore,
  useReadScore,
  useUpdateScore,
} from '@/services/scores/hooks';
import {
  CreateScorePayload,
  CreateScoreResponse,
  ReadScoreResponse,
  UpdateScorePayload,
  UpdateScoreResponse,
} from '@/services/scores/types';
import useStore from '@/store';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { nanoid } from 'nanoid';
import { describe, expect, it } from 'vitest';

vi.mock('nanoid', () => ({ nanoid: vi.fn(() => 'test-id') }));

vi.mock('@/services/scores/hooks', () => ({
  useCreateScore: vi.fn(() => ({ mutate: vi.fn() })),
  useReadScore: vi.fn(),
  useUpdateScore: vi.fn(() => ({ mutate: vi.fn() })),
}));
vi.mock('@/store', () => ({
  default: vi.fn(() => ({
    anonymousId: 'anonymous-id',
    setAnonymousId: vi.fn(),
  })),
}));

vi.mock('@/helpers', () => ({
  getConfirmationToast: vi.fn(),
}));
vi.mock('@tanstack/react-query', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useQueryClient: vi.fn(),
  };
});

describe('useScore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the initial score correctly', async () => {
    vi.mocked(useReadScore).mockImplementation(
      () =>
        ({ data: { score: 10 } }) as UseQueryResult<ReadScoreResponse, Error>,
    );

    const { result } = renderHook(() => useScore());
    expect(result.current.score).toBe(10);
  });

  it('should update score for existing anonymous ID', async () => {
    const updateScoreMock = vi.fn();
    vi.mocked(useUpdateScore).mockImplementation(
      () =>
        ({
          mutate: updateScoreMock,
        }) as unknown as UseMutationResult<
          UpdateScoreResponse,
          Error,
          UpdateScorePayload,
          UpdateScoreResponse
        >,
    );
    vi.mocked(useStore).mockImplementation(() => ({
      anonymousId: 'existing-id',
      setAnonymousId: vi.fn(),
    }));

    const { result } = renderHook(() => useScore());
    act(() => {
      result.current.handleScoreUpdate(20);
    });

    expect(updateScoreMock).toHaveBeenCalledWith({
      id: 'existing-id',
      score: 20,
    });
  });

  it('should create score for new anonymous ID', async () => {
    const createScoreMock = vi.fn();
    vi.mocked(useCreateScore).mockImplementation(
      () =>
        ({
          mutate: createScoreMock,
        }) as unknown as UseMutationResult<
          CreateScoreResponse,
          Error,
          CreateScorePayload,
          CreateScoreResponse
        >,
    );
    vi.mocked(useStore).mockImplementation(() => ({
      anonymousId: undefined,
      setAnonymousId: vi.fn(),
    }));

    const { result } = renderHook(() => useScore());
    act(() => {
      result.current.handleScoreUpdate(30);
    });

    expect(createScoreMock).toHaveBeenCalledWith({ id: 'test-id', score: 30 });
    expect(nanoid).toHaveBeenCalled();
  });
});
