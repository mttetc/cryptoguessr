export const scoresKeys = {
  all: ['score'],
  list: (payload: { id: string; score?: number }) => [
    ...scoresKeys.lists(),
    { ...payload },
  ],
  lists: () => [...scoresKeys.all, 'list'],
};
