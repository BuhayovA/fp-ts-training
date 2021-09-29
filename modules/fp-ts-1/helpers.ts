export const getEntityMock = <A>(data: A): Promise<A> =>
  new Promise((resolve, reject) => setTimeout(() => resolve(data), 300));
