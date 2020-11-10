import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useQuery() {
  const [paramMap, setParamMap] = useState<any>({});
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log("Location changed");
    const params = new URLSearchParams(location.search);
    const paramKeys = Array.from(params.keys());
    const map = paramKeys.reduce(
      (val, key) => ({
        ...val,
        [key]: params.get(key),
      }),
      {} as any
    );
    setParamMap(map);
  }, [location]);

  const setQuery = (key: string, val: string) => {
    const search = "?" + new URLSearchParams({ ...paramMap, [key]: val }).toString();
    history.push({
      pathname: location.pathname,
      search,
    });
  };

  return {
    paramMap,
    setQuery,
  };
}
