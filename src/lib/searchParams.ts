import { defaultTheme } from "styles/theme";

function getStoredValues(keys: string[]): Record<string, string | null> {
  const res: Record<string, string | null> = {};
  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) {
      res[key] = value;
    }
  });
  return res;
}

export function generateSearchParams(params: Record<string, any>): URLSearchParams {
  const restoredParams = getStoredValues(["primaryColor", "secondaryColor", "leftColor", "rightColor"]);
  const searchParams = new URLSearchParams({
    ...defaultTheme,
    ...restoredParams,
    ...params,
  });
  return searchParams;
}
