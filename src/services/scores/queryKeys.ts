export const scoresKeys = {
  all: ['cryptoPrice'],
  list: (id: string, score?: number) => [...scoresKeys.lists(), id, score],
  lists: () => [...scoresKeys.all, 'list'],
};
