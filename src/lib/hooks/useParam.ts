import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useParam(key: string, defaultValue = "") {
  const [value, setValue] = useState<string>(defaultValue);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentValue = params.get(key);
    if (currentValue !== value) {
      setValue(currentValue || defaultValue);
    }
  }, [key, defaultValue, location, value]);

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
