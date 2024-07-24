export const scoresKeys = {
  all: ['score'],
  list: (payload: { id: string }) => [...scoresKeys.lists(), { ...payload }],
  lists: () => [...scoresKeys.all, 'list'],
};
