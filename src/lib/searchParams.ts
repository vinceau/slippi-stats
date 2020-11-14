function getStoredValues(keys: string[]): Record<string, string | null> {
  const res: Record<string, string | null> = {};
  keys.forEach((key) => {
    res[key] = localStorage.getItem(key);
  });
  return res;
}

export function generateSearchParams(params: Record<string, any>): URLSearchParams {
  const defaultParams = getStoredValues(["primaryColor", "secondaryColor", "leftColor", "rightColor"]);
  const searchParams = new URLSearchParams({
    ...defaultParams,
    ...params,
  });
  return searchParams;
}
