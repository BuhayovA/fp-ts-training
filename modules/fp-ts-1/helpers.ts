export const getEntityMock = <A>(data: A): Promise<A> =>
  new Promise((resolve, reject) => setTimeout(() => reject(data), 300));
