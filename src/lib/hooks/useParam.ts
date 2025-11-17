import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useParam(key: string, defaultValue = "") {
  const history = useHistory();
  const location = useLocation();

  const value = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const currentValue = params.get(key);
    return currentValue || defaultValue;
  }, [key, defaultValue, location.search]);

  const setParam = (val: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key, val);
    const search = "?" + params.toString();
    history.push({
      pathname: location.pathname,
      search,
    });
  };

  return [value, setParam] as const;
}
