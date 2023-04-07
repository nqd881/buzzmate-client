export const toArray = <T>(els: T | T[]): T[] => {
  return Array.isArray(els) ? els : [els];
};
