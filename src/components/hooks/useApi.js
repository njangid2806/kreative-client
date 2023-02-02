// This is for account page

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  let [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const audience = "https://kreative-order/";
          const scope = 'update:account';
          const token = await getAccessTokenSilently({
            audience,
            scope,
          });
          setAccessToken(token || "");
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [accessToken, getAccessTokenSilently]);

  const postCall = (url, bodyObj) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodyObj),
    };
    return fetch(url, requestOptions);
  };
  return { postCall };
};

export default useApi;
